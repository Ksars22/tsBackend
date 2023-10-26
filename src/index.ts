import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import AuthRouter from './routes/Auth';
import MealRouter from './routes/Meal';
import vEnviroment from './enviroment';

export const env = new vEnviroment();
const app = express();

mongoose.connect(env.db_uri)
    .then(() => console.log('Connected to db'))
    .catch(error => console.error(error));

app.use(express.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/meal', MealRouter);

app.listen(env.port, () => console.log('Server started'));