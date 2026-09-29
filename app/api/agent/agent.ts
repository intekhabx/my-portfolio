import client from "@/lib/openai";


export default async function getResponseOfLLM(userPrompt: string){

  const streamResponse = await client.chat.completions.create({
    model: process.env.LLM_MODEL || "gemini-2.5-flash",
    messages: [
      {
        role: "system",
        content: "you are a helpful assistant that respond user in calm and nicely"
      },
      {
        role: "user",
        content: userPrompt,
      }
    ],
    stream: true,
  })

  return streamResponse;
}
