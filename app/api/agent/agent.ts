import client from "@/lib/openai";
import redis from "@/lib/redis";



const getMessageHistory = async (userSessionId: string) => {
  // ["{role: 'user', content: 'tell me your project'}", "{role: 'assistant', content: 'pulsehub'}", ....]
  const chatHistoryArray = await redis.lrange(`active-chat:${userSessionId}`, 0, -1);
  return chatHistoryArray;
}


export default async function getResponseOfLLM(userPrompt: string, userSessionId: string){

  const streamResponse = await client.chat.completions.create({
    model: process.env.LLM_MODEL || "gemini-2.5-flash",
    messages: [
      {
        role: "system",
        content: "you are a helpful assistant that respond user in calm and nicely"
      },
      // previous message
      ...(await getMessageHistory(userSessionId))
                .map((msgObj) => JSON.parse(msgObj)),
      {
        role: "user",
        content: userPrompt,
      }
    ],
    stream: true,
  })

  // add the user prompt in the redis for user msge context
  const key = `active-chat:${userSessionId}`;
  await redis.rpush(key, JSON.stringify({role: "user", content: userPrompt}));
  await redis.expire(key, 30 * 24 * 60 * 60); //30days

  return streamResponse;
}
