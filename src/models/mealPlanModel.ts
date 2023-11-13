import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema({
    uid: {
        required: true,
        type: String,
    },
    targetCost: {
        required: true,
        type: String,
    },
    calorieGoal: {
        required: true,
        type: String,
    },
    organic: {
        required: true,
        type: String,
    },
    dietType: {
        required: true,
        type: String,
    },
});

export const MealPlanModel = mongoose.model("MealPlan", mealPlanSchema);
