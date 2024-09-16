import OpenAI from "openai";
const openai = new OpenAI({ apiKey: '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' });

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Dame consejos sobre qué puedo hacer en los 5 minutos de descanso de mi pomodoro",
        },
    ],
});

console.log(completion.choices[0].message);