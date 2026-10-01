import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function GET(){
  try {
    // step:1 - check user has already a sessionId or not
    const cookieStore = await cookies();
    const hasCookie = cookieStore.has("sessionId");

    if(!hasCookie){
      // step:2 - if user have no sessionId then generate a random sessionId
      const sessionId = crypto.randomUUID();
  
      // step:3 - add this sessionId to the httpOnly cookie
      cookieStore.set("sessionId", sessionId, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 365, //1 year,
        path: "/",
      });
    }

    // step:3 - send the response to the frontend
    return NextResponse.json({
      message: "sessionId is attached"
    }, {status: 200})
  } 
  catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "something went wrong while creating visitor session",
    }, {status: 500})
  }
}
