import express from 'express';
import { MealPlanModel } from '../models/mealPlanModel';

const MealRouter = express.Router();

MealRouter.post('/create-meal-plan', async (req, res) => {
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