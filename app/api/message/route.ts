import dbConnection from "@/lib/db";
import { messageSchemaDto } from "@/lib/validation";
import { messageModel } from "@/models/message.model";
import { isLoggedIn } from "@/utils/auth.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const isVerified = await isLoggedIn(req);
    if(!isVerified){
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    await dbConnection();

    const messages = await messageModel.find();

    return NextResponse.json({
      message: "message fetched successfully",
      data: messages
    }, {status: 200})
  } 
  catch (err) {
    console.error("something went wrong while fetching messages", err);
    return NextResponse.json({
      error: "something went wrong while fetching messages",
    }, {status: 500})
  }
}


// not used yet
export async function POST(req: NextRequest){
  try {
    const isVerified = await isLoggedIn(req);
    if(!isVerified){
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    //extract the payload fromm request
    const rawBody = await req.json();
    const body = await messageSchemaDto.safeParseAsync(rawBody);

    if(!body.success){
      return NextResponse.json({
        error: body.error.flatten().fieldErrors
      }, {status: 400})
    }

    const {email, message, name} = body.data;

    await dbConnection();

    await messageModel.create({
      name,
      email,
      message
    })

    return NextResponse.json({
      message: "message sent successfully"
    }, {status: 201})
  } 
  catch (err) {
    return NextResponse.json({
      error: "something went wrong while sending message"
    }, {status: 500})
  }
}