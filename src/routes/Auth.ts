import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/userModel';
import { env } from '../index'

export function verifyToken(req: any, res: any, next: any) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403);
    }
}

const AuthRouter = express.Router();

AuthRouter.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await UserModel.findOne({ "username": username });

        if (!user) {
            res.status(403).send({ "message": "Error Username or Password is Incorrect" });
            return;
        }

        bcrypt.compare(password, user.password, (error, result) => {
            if (error) {
                res.status(403).send({ message: "Login Error" });
                console.error('Error comparing passwords', error);
            } else if (result) {
                jwt.sign({ id: user._id }, env.secret_key, (error: any, token: any) => {
                    if (error) {
                        res.status(500).send({ "error": "JWT Error" });
                    } else {
                        res.status(200).json({ token });
                    }
                });
            } else {
                res.status(403).send({ "message": "Error Username or Password is Incorrect" });
            }
        });
    } catch (err) {
        res.status(500).send({ "error": "Internal Server Error" });
    }
});

AuthRouter.post('/signup', async (req, res) => {

    const user = await UserModel.findOne({ username: req.body.username });
    if (user != null) {
        res.status(403).json({ message: "Error username already exists" });
    }
    else {
        const saltrounds = 10;

        var password = req.body.password;
        bcrypt.hash(password, saltrounds, (error, hash) => {
            if (error) {
                console.error('Error hashing password:', error);
            }
            else {
                const data = new UserModel({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email,
                    phone: req.body.phone
                });
                data.save();
                res.status(200).json({ message: "Signup Success" });
            }
        });
    }
});

AuthRouter.get('/userID', async (req, res) => {

    const user = await UserModel.findOne({ username: req.body.username });
    if (user != null) {
        res.status(403).json({ message: "Error username already exists" });
    }
    else {
        const saltrounds = 10;

        var password = req.body.password;
        bcrypt.hash(password, saltrounds, (error, hash) => {
            if (error) {
                console.error('Error hashing password:', error);
            }
            else {
                const data = new UserModel({
                    username: req.body.username,
                    password: hash,
                    email: req.body.email,
                    phone: req.body.phone
                });
                data.save();
                res.status(200).json({ message: "Signup Success" });
            }
        });
    }
});

export default AuthRouter;