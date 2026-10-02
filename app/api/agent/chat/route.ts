import { NextRequest, NextResponse } from "next/server";
import getResponseOfLLM from "../agent";
import redis from "@/lib/redis";
import { cookies } from "next/headers";




// export async function POST(req: NextRequest) {
//   try {
//     // step:1 - extract the user input message prompt
//     const { prompt } = await req.json();

//     if (!prompt?.trim()) {
//       return NextResponse.json({
//         error: "Prompt is required",
//       },{status: 400});
//     }

//     // step:2 - Get LLM stream response
//     const response = await getResponseOfLLM(prompt);

//     // 3. Create a stream for the frontend
//     const encoder = new TextEncoder();

//     const readableStream = new ReadableStream({
//       async start(controller) {
//         try {
//           // loop the response and take chunks
//           for await (const chunk of response) {
//             const content = chunk.choices[0]?.delta?.content;

//             if (!content) {
//               continue;
//             }

//             // Send each chunk immediately to frontend
//             controller.enqueue(
//               encoder.encode(
//                 `data: ${JSON.stringify({
//                   type: "text",
//                   content,
//                 })}\n\n`
//               )
//             );
//           }

//           // Tell frontend that generation is complete
//           controller.enqueue(
//             encoder.encode(
//               `data: ${JSON.stringify({
//                 type: "done",
//               })}\n\n`
//             )
//           );

//           controller.close();
//         } 
//         catch (error) {
//           console.error("Streaming error:", error);

//           controller.enqueue(
//             encoder.encode(
//               `data: ${JSON.stringify({
//                 type: "error",
//                 message: "Something went wrong while generating response.",
//               })}\n\n`
//             )
//           );

//           controller.close();
//         }
//       },
//     });

//     // 4. Return stream response
//     return new Response(readableStream, {
//       status: 200,
//       headers: {
//         "Content-Type": "text/event-stream; charset=utf-8",
//         "Cache-Control": "no-cache, no-transform",
//         Connection: "keep-alive",
//       },
//     });
//   } 
//   catch (error) {
//     console.error("API error:", error);

//     return NextResponse.json({
//       error: "Something went wrong while generating response",
//     },{status: 500});
//   }
// }



export async function POST(req: NextRequest) {
  try {
    // step:1 - extract the user input message prompt
    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json({
        error: "Prompt is required",
      },{status: 400});
    }

    // step:2 - extract the visitor(user) sessionId that we add in the cookie
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId");
    if(!sessionId){
      return NextResponse.json({
        error: "sessionId is required",
      },{status: 400});
    }

    // step:3 - LLM generator ko call karo. // Ye generator handle karega: LLM → tool → LLM → final response.
    const response = getResponseOfLLM(prompt, sessionId.value);

    // step:4 - Encoder create karo. Isse JavaScript string ko Uint8Array mein convert karke stream mein bhejega.
    const encoder = new TextEncoder();

    // step:5 - frontend ke liye ReadableStream create karo.
    const stream = new ReadableStream({
      async start(controller) {
        // loop the response and take chunks
        for await (const event of response) {
          // if Ai response agar normal text hai
          if(event.type === "text"){
            // immediately frontend ko stream kro
            controller.enqueue(
              encoder.encode(event.content)
            );
          }
        }

        controller.close();
      },
    });

    // step:6 - Return stream response
    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } 
  catch (error) {
    console.error("API error:", error);

    return NextResponse.json({
      error: "Something went wrong while generating response",
    },{status: 500});
  }
}



// function that resets the chat history
export async function PATCH(){
  try {
    // step:1 - extract the user sessionid that we insert in the cookie
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId");
    if(!sessionId){
      return NextResponse.json({
        error: "sessionId is required to reset the chat"
      }, {status: 400});
    }

    // step:2 - rename the active-chat:${sessionId} key into another key
    await redis.rename(`active-chat:${sessionId.value}`, `reset-chat:${sessionId.value}:${Date.now()}`);

    // step:3 - send the response to the frontend
    return NextResponse.json({
      message: "chat reset successfully",
    }, {status: 200});
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "somthing went wrong while resetting chat"
    }, {status: 500});
  }
}
