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

function verifyToken(req, res, next) {
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

app.get('/test', (req, res) => {

    res.redirect(200, 'https://macrosolver.com/login');
});

app.post('/login', async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({ "username": username });
    if (user)
        bcrypt.compare(password, user.password, (error, result) => {
            if (error) {
                console.error('Error comparing passwords', error);
            }
            else if (result) {
                console.log('Password Matched');
                jwt.sign({ user: user }, sKey, (error: any, token: any) => {
                    if (error) {
                        console.error("error jwt");
                    }
                    else {

                        res.status(200).json({ token });
                    }
                })
            }
            else {
                res.status(403).send({ "message": "Error Username or Password is Incorrect" });
            }
        });
});

app.post('/signup', (req, res) => {

    const saltrounds = 10;

    var password = req.body.password;
    bcrypt.hash(password, saltrounds, (error, hash) => {
        if (error) {
            console.error('Error hashing password:', error);
        }
        else {
            console.log(hash);

            const data = new UserModel({
                username: req.body.username,
                password: hash,
                email: req.body.email,
                phone: req.body.phone
            });
            const dataToSave = data.save();
            res.status(200).json(dataToSave);
        }
    });

});

app.listen(process.env.PORT, () => console.log('Server started'));