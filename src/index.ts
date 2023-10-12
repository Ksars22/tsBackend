import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UserModel } from './model';
import cors from 'cors';

dotenv.config();
const app = express();

const uri: string = process.env.DATABASE_URL || '';

mongoose.connect(uri)
    .then(() => console.log('Connected to db'))
    .catch(error => console.error(error));

app.use(express.json());
app.use(cors());

app.post('/add-user', (req, res) => {
    const data = new UserModel({
        uid: req.body.uid,
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

app.listen(1313, () => console.log('Server started'));