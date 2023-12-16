const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
    user: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    meals: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            calorieTotal: {
                type: Number,
                required: true,
            },
            carbs: {
                type: Number,
                required: true,
            },
            fat: {
                type: Number,
                required: true,
            },
            protein: {
                type: Number,
                required: true,
            },
            instructions: {
                type: String,
                required: true,
            },
            ingredients: [
                {
                    name: {
                        type: String,
                        required: true,
                        trim: true,
                    },
                    quantity: {
                        type: String,
                        required: true,
                        trim: true,
                    },
                },
            ],
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export const MealPlanModel = mongoose.model("MealPlanModel", mealSchema);
