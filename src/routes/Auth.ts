import express from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

import { UserModel } from "../models/userModel";
import { env } from "../index";

const AuthRouter = express.Router();

AuthRouter.post("/forgot-password", async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiration = new Date(Date.now() + 3600000); // Token valid for 1 hour

        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;
        await user.save();

        const transporter = nodemailer.createTransport({
            host: env.smtp_host,
            port: 2525,
            auth: {
                user: env.email_username,
                pass: env.email_password,
            },
        });

        const mailOptions = {
            from: env.sender_email,
            to: user.email,
            subject: "Password Reset",
            text: `Click the following link to reset your password: http://localhost:3001/reset-password/${resetToken}`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: "Password reset email sent" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

AuthRouter.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await UserModel.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
        });

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid or expired token" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;

        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

AuthRouter.post("/checkLogin", (req, res) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, env.secret_key, (error: any, decoded: any) => {
            if (error) {
                res.status(403).json({ message: "Unauthorized" });
            } else {
                res.status(200).json({ token: token });
            }
        });
    } else {
        res.status(403).json({ message: "Unauthorized" });
    }
});

AuthRouter.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const rememberMe = req.body.rememberMe;

    try {
        const user = await UserModel.findOne({ username: username });

        if (!user) {
            res.status(403).send({
                message: "Error Username or Password is Incorrect",
            });
            return;
        }

        bcrypt.compare(password, user.password, (error, result) => {
            if (error) {
                res.status(403).send({ message: "Login Error" });
                console.error("Error comparing passwords", error);
            } else if (result) {
                jwt.sign(
                    { id: user._id },
                    env.secret_key,
                    (error: any, token: any) => {
                        if (error) {
                            res.status(500).send({ error: "JWT Error" });
                        } else {
                            let expirationTime;
                            if (rememberMe) {
                                expirationTime = 30 * 24 * 60 * 60 * 1000;
                            } else {
                                expirationTime = 60 * 60 * 1000;
                            }
                            const expirationDate = new Date(
                                Date.now() + expirationTime
                            );
                            res.cookie("token", token, {
                                expires: expirationDate,
                            });
                            res.status(200).json({ login: "success" });
                        }
                    }
                );
            } else {
                res.status(403).send({
                    message: "Error Username or Password is Incorrect",
                });
            }
        });
    } catch (err) {
        res.status(500).send({ error: "Internal Server Error" });
    }
});

AuthRouter.post("/signup", async (req, res) => {
    const user = await UserModel.findOne({ username: req.body.username });
    if (user != null) {
        res.status(403).json({ message: "Error username already exists" });
    } else {
        const saltrounds = 10;

        var password = req.body.password;
        bcrypt.hash(password, saltrounds, (error, hash) => {
            if (error) {
                console.error("Error hashing password:", error);
            } else {
                const data = new UserModel({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email,
                    phone: req.body.phone,
                });
                data.save();

                jwt.sign(
                    { id: data._id },
                    env.secret_key,
                    (error: Error | null, token?: string) => {
                        if (error) {
                            res.status(500).send({ error: "JWT Error" });
                        } else {
                            const expirationTime = 60 * 60 * 1000; // Adjust as needed
                            const expirationDate = new Date(
                                Date.now() + expirationTime
                            );
                            res.cookie("token", token, {
                                expires: expirationDate,
                            });
                            res.status(200).json({ login: "success" });
                        }
                    }
                );
            }
        });
    }
});

AuthRouter.post("/user-profile", async (req, res) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(
            token,
            env.secret_key,
            async (error: VerifyErrors | null, decoded: any) => {
                if (error) {
                    res.status(403).json({ message: "Unauthorized" });
                } else {
                    const userId = decoded.id;

                    try {
                        const updatedUser = await UserModel.findByIdAndUpdate(
                            userId,
                            {
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                dateOfBirth: req.body.dateOfBirth,
                                sex: req.body.sex,
                                height: req.body.height,
                                weight: req.body.weight,
                            },
                            { new: true }
                        );

                        if (!updatedUser) {
                            return res
                                .status(404)
                                .json({ message: "User not found" });
                        }

                        res.status(200).json({
                            message: "User profile updated",
                            user: updatedUser,
                        });
                    } catch (updateError) {
                        console.error(
                            "Error updating user profile:",
                            updateError
                        );
                        res.status(500).json({
                            message: "Internal Server Error",
                        });
                    }
                }
            }
        );
    } else {
        res.status(403).json({ message: "Unauthorized" });
    }
});

AuthRouter.get("/logout", (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "logout successful" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default AuthRouter;
