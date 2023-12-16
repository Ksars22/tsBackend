import axios from "axios";

interface MealPlanForm {
    targetCost: string;
    calorieGoal: string;
    organic: string;
    dietType: string;
    notes: string;
}

interface GeneratedMealPlan {
    // Define the structure of the generated meal plan JSON
    // Update these types based on the actual structure from the OpenAI API
    // For simplicity, I'm using any here, but you should specify the types properly
    [key: string]: any;
}

const generateMealPlan = async (
    mealPlanForm: MealPlanForm
): Promise<GeneratedMealPlan | null> => {
    try {
        const headers = {
            "Content-Type": "application/json",
            Authorization:
                "Bearer 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",
        };

        const data = {
            messages: [
                { role: "system", content: "You are" },
                {
                    role: "user",
                    content: `Generate a meal plan with the following information: ${JSON.stringify(
                        mealPlanForm
                    )}`,
                },
            ],
            model: "gpt-3.5-turbo",
        };

        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            JSON.stringify(data),
            { headers }
        );

        // Extract the generated meal plan from the response
        const generatedPlan = response.data.choices[0]?.text;

        // Parse the generated text as JSON
        const mealPlanJSON: GeneratedMealPlan = JSON.parse(generatedPlan);

        // Output the generated meal plan
        console.log(mealPlanJSON);

        return mealPlanJSON;
    } catch (error) {
        // Handle errors appropriately (e.g., log to monitoring service, show user-friendly message)
        console.error("Error generating meal plan:", error);
        return null;
    }
};

export default generateMealPlan;
