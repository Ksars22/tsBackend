import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import AuthRouter from './routes/Auth'
import vEnviroment from './enviroment';

export const env = new vEnviroment();
const app = express();

mongoose.connect(env.db_uri)
    .then(() => console.log('Connected to db'))
    .catch(error => console.error(error));

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(helmet());
app.use('/auth', AuthRouter);

app.listen(env.port, () => console.log('Server started'));