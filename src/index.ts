import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { UserModel } from './model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();
const app = express();
const sKey: string = process.env.SECRET_KEY || '';

function verifyToken(req: any, res: any, next: any) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.status(403);
    }
}

const dev: string = process.env.DEV_USER || '';
var uri: string = '';

switch (dev) {
    case 'matt':
        uri = process.env.DATABASE_URL || '';
        break;
    case 'kyle':
        uri = process.env.TEST_DATABASE_URL || '';
        break;
}

mongoose.connect(uri)
    .then(() => console.log('Connected to db'))
    .catch(error => console.error(error));

app.use(express.json());
app.use(cors());

app.post('/add-user', (req, res) => {
    const data = new UserModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    })

    const dataToSave = data.save();
    res.status(200).json(dataToSave);
})

app.get('/get-user', async (req, res) => {
    try {
        console.log(req.query.username)
        const user = await UserModel.findOne({ "username": req.query.username });
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/login', async (req, res) => {
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
                res.status(404).send({ "error": "Login Error" });
                console.error('Error comparing passwords', error);
            } else if (result) {
                console.log('Password Matched');
                jwt.sign({ id: user._id }, sKey, (error: any, token: any) => {
                    if (error) {
                        console.error("error jwt");
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
        console.error('Error in login:', err);
        res.status(500).send({ "error": "Internal Server Error" });
    }
});

app.post('/signup', async (req, res) => {

    const user = await UserModel.findOne({ username: req.body.username });
    if (user != null) {
        res.status(400).json({ message: "Error username already exists" });
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
                const dataToSave = data.save();
                res.status(200).json({ message: "Login Success" });
            }
        });
    }
});

app.listen(process.env.PORT, () => console.log('Server started'));