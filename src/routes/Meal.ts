import express from 'express';
import { MealPlanModel } from '../models/mealPlanModel';

const MealRouter = express.Router();

MealRouter.post('/create-meal-plan', (req, res) => {


  const uid = req.body.uid;
  const mealJson = req.body.password;

  console.log(req.body);
  const mealPlanData = new MealPlanModel({
    uid: req.body.uid,
    mealJson: req.body.mealJson
  });
  mealPlanData.save();
 
});

export default MealRouter;