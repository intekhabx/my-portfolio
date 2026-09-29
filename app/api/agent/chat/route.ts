import { NextRequest, NextResponse } from "next/server";
import getResponseOfLLM from "../agent";




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

    // step:2 - Get LLM stream response
    const response = await getResponseOfLLM(prompt);

    // 3. Create a stream for the frontend
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        // loop the response and take chunks
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content;
          // console.log(content);

          if (!content) continue;

          controller.enqueue(
            encoder.encode(content)
          );
        }

        controller.close();
      },
    });

    // 4. Return stream response
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
