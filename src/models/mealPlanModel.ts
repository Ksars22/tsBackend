import mongoose from 'mongoose';

const mealPlanSchema = new mongoose.Schema({
    uid: {
        required: true,
        type: String
    },
    mealJson: {
        required: true,
        type: String
    }
})

export const MealPlanModel = mongoose.model('MealPlan', mealPlanSchema)