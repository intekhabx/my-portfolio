import client from "@/lib/openai";
import redis from "@/lib/redis";
import { getProjectsTool } from "./tools/get-projects";
import { getProjectDetailsTool } from "./tools/get-project-details";
import { toolHandlers } from "./tools";
import { systemPrompt } from "./utils/system-prompt";



export const getMessageHistory = async (userSessionId: string) => {
  // ["{role: 'user', content: 'tell me your project'}", "{role: 'assistant', content: 'pulsehub'}", ....]
  const chatHistoryArray = await redis.lrange(`active-chat:${userSessionId}`, 0, -1);
  return chatHistoryArray.map((msgObj)=> JSON.parse(msgObj));
}



// Async generator use kar rahe hain.
// Iska benefit:
// getResponseOfLLM() -> directly frontend ko response nahi bhejega.
// Ye har event ko `yield` karega.
// POST() in events ko receive karke frontend ko stream karega.
export default async function* getResponseOfLLM(userPrompt: string, userSessionId: string){

  // STEP:1. get previous chat history
  const history = await getMessageHistory(userSessionId);

  // STEP:2. add the user prompt in the chat history //we already fetched the old history and then we added this user prompt
  const key = `active-chat:${userSessionId}`;
  await redis.rpush(key, JSON.stringify({role: "user", content: userPrompt}));
  await redis.expire(key, 30 * 24 * 60 * 60); //30days

  // STEP:3. Current conversation prepare kr rhe h.
  const messages: any[] = [
    {
      role: "system",
      content: systemPrompt,
    },
    // previous history chat message
    ...history,
    {
      role: "user",
      content: userPrompt,
    }
  ];

  // STEP:4. Available tools define kiye hai.
  const tools = [ getProjectsTool, getProjectDetailsTool ];


  // STEP:5. LLM → tool → LLM → tool...
  // jab tak final answer nahi milta, loop chalega.
  while(true){
    // STEP:6. LLM ko tools ke saath stream mode mein call kr rhe h
    const streamResponse = await client.chat.completions.create({
      model: process.env.LLM_MODEL || "gemini-2.5-flash",
      messages,
      stream: true,
      tool_choice: "auto",
      tools,
    });

    // STEP 7: Current assistant response ka text collect karenge.
    let message = "";

    // STEP 8: Stream mein tool calls collect karenge.
    const toolCalls: Record<number,{ id?: string; name: string; arguments: string;}> = {};

    // STEP 9: LLM stream ko chunk-by-chunk read karo.
    for await (const chunk of streamResponse) {

      const delta = chunk.choices[0]?.delta;
      // Agar normal text mila, to frontend ko immediately yield karo.
      if (delta?.content) {
        message += delta.content;
        // POST() function is event ko receive karega aur frontend ko bhej dega.
        yield {
          type: "text",
          content: delta.content
        };
      }

      // STEP 10: Agar tool call mila, to usko collect karo.
      if (delta?.tool_calls) {

        for (const toolCall of delta.tool_calls) {
          const index = toolCall.index;
          // STEP 11: First chunk hone par, tool-call object create karo.
          if (!toolCalls[index]) {
            toolCalls[index] = {
              id: toolCall.id,
              name: "",
              arguments: ""
            };
          }
        
          // STEP 12: Tool name collect karo.
          if (toolCall.function?.name) {
            toolCalls[index].name += toolCall.function.name;
          }

          // STEP 13: Tool arguments collect karo.
          if (toolCall.function?.arguments) {
            toolCalls[index].arguments += toolCall.function.arguments;
          }
        }
      }
    }

    // STEP 14: Complete stream receive hone ke baad, tool calls ko array mein convert karo.
    const calls = Object.values(toolCalls);

    // STEP 15: Agar tool call nahi hai, iska matlab final response complete ho gaya.
    if (calls.length === 0) {
      // final response redis me save kro context ke liye
      await redis.rpush(key, JSON.stringify({ role: "assistant", content: message }));
      return;
    }


    // STEP 16: Assistant ka tool-call message, conversation mein add karo.
    messages.push({ role: "assistant", tool_calls: calls.map((call) => ({ 
      id: call.id,
      type: "function",
      function: {
        name: call.name,
        arguments: call.arguments
      }
      }))
    });

    // STEP 17: Har requested tool ko execute karo.
    for (const call of calls) {
      const toolHandler = toolHandlers[call.name as keyof typeof toolHandlers];
      if(!toolHandler){
        throw new Error(`Unknown tool: ${call.name}`);
      }

      const args = JSON.parse(call.arguments);
      // Actual backend function execute karo.
      const result = await toolHandler(args);

      // Tool result ko messages mein add karo // taaki next LLM request mein model // tool ka result dekh sake.
      messages.push({ role: "tool", tool_call_id: call.id, content: JSON.stringify(result)});
    }

    // ***NOW WHILE LOOP PHIR START HOGA AUR ITERATE KREGA (step:6 to step:17)***
  }

}
