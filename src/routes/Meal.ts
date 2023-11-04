import express from 'express';
import { MealPlanModel } from '../models/mealPlanModel';
import jwt from 'jsonwebtoken';
import { env } from '../index';

const MealRouter = express.Router();

MealRouter.post('/create-meal-plan', async (req, res) => {
  console.log(req)
  let token: string = req.headers['authorization'] || ''
  jwt.verify(token, env.secret_key, (err: any, authData: any) => {
    if(err) {
        console.log(err)
        res.sendStatus(403);
    }
  })
  console.log(token)

  try {
    const uid = req.body.uid;
    const mealPlanForm = req.body.mealPlanForm;

    console.log(req.body);

    const mealPlanData = new MealPlanModel({
      uid: uid,
      mealPlanForm: mealPlanForm
    });

    await mealPlanData.save(); // Use await to handle the asynchronous operation

    res.sendStatus(200); // Send a 200 OK response to the client
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default MealRouter;