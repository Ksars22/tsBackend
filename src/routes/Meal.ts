import express from 'express';
import { MealPlanModel } from '../models/mealPlanModel';

const MealRouter = express.Router();

MealRouter.post('/create-meal-plan', (req, res) => {

  try {
    const uid = req.body.uid;
    const mealJson = req.body.password;
  
    console.log(req.body);
    const mealPlanData = new MealPlanModel({   
      uid: req.body.uid,
      mealJson: req.body.mealJson
    });
    mealPlanData.save();
    res.status(200);
  } catch (error) {
    res.status(500).json({ "error": "Internal Server Error" });
  }

 
});

export default MealRouter;