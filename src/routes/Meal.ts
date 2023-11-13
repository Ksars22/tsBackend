import express from "express";
import { MealPlanModel } from "../models/mealPlanModel";
import jwt from "jsonwebtoken";
import { env } from "../index";

export interface CustomRequest extends Request {
    token?: string;
}

const MealRouter = express.Router();

MealRouter.post("/create-meal-plan", async (req, res) => {
    let cookie: string = req.headers["authorization"] || "";
    console.log(cookie);
    jwt.verify(cookie, env.secret_key, (err: any, authData: any) => {
        if (err) {
            console.log(err);
            res.sendStatus(403);
        } else {
            console.log(req.body.mealPlanForm);
            const mealPlanModel = new MealPlanModel({
                uid: cookie,
                targetCost: req.body.mealPlanForm.targetCost,
                calorieGoal: req.body.mealPlanForm.calorieGoal,
                organic: req.body.mealPlanForm.organic,
                dietType: req.body.mealPlanForm.dietType,
            });
            mealPlanModel.save();
            console.log("SUCCESSSSSSSS");
            res.json({
                message: "POST created...",
                authData,
            });
        }
    });
});

export default MealRouter;
