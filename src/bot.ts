import axios, { AxiosError } from "axios";

interface MealPlanForm {
    targetCost: string;
    calorieGoal: string;
    organic: string;
    dietType: string;
    notes: string;
}

interface GeneratedMealPlan {
    [key: string]: any;
}

const generateMealPlan = async (
    mealPlanForm: MealPlanForm
): Promise<GeneratedMealPlan | null> => {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
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
                        )}, then, structure it using this schema:
            
            \`\`\`
            {
                user: ObjectId,
                name: String,
                description: String,
                meals: [
                    {
                        name: String,
                        descriptiveName: String,
                        calorieTotal: Number,
                        carbs: Number,
                        fat: Number,
                        protein: Number,
                        instructions: String,
                        ingredients: [
                            {
                                name: String,
                                quantity: String,
                            },
                        ],
                    },
                ],
                createdAt: Date,
                updatedAt: Date
            }
            \`\`\`
            Provide the meal plan as a JSON object with the specified structure. Do not include additional text or explanations in the output, only the JSON representation of the meal plan. Must be ready to parse json. Make the user equal to test. all fields must be filled.
            `,
                    },
                ],
                model: "gpt-3.5-turbo",
            };

            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                JSON.stringify(data),
                { headers }
            );

            const generatedPlan = response.data.choices[0].message.content;
            const mealPlanString = JSON.stringify(generatedPlan);

            const userId = 24;

            const updatedMealPlanString = mealPlanString.replace(
                /"user": "ObjectId"/,
                `"user": "${userId}"`
            );

            console.log(
                "Generated Plan (logged from bot.ts): " +
                    JSON.stringify(updatedMealPlanString)
            );

            if (!generatedPlan) {
                console.error("Error: No meal plan generated");
                return null;
            }

            const mealPlanJSON: GeneratedMealPlan = JSON.parse(generatedPlan);
            return mealPlanJSON;
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 429) {
                // If rate limited, wait and retry
                retries++;
                console.warn(`Rate limited. Retrying attempt ${retries}...`);
                await new Promise((resolve) =>
                    setTimeout(resolve, 1000 * retries)
                ); // Wait for an increasing amount of time
            } else {
                console.error("Error generating meal plan:", error.message);
                return null;
            }
        }
    }

    console.error(
        `Max retries (${maxRetries}) reached. Unable to generate meal plan.`
    );
    return null;
};

export default generateMealPlan;
