import dbConnection from "@/lib/db";
import { messageModel } from "@/models/message.model";
import { isLoggedIn } from "@/utils/auth.utils";
import { NextRequest, NextResponse } from "next/server";



// function that delete message by id
export async function DELETE(req: NextRequest, {params}: {params: Promise<{id: string}>}){
  try {
    const {id} = await params;
    if(!id){
      return NextResponse.json({
        error: `message id is missing`,
      }, {status: 400})
    }

    const isVerified = await isLoggedIn(req);
    if (!isVerified) {
      return NextResponse.json({
        error: "Unauthorized" 
      }, { status: 401 });
    }

    await dbConnection();

    const message = await messageModel.findByIdAndDelete(id);
    if(!message){
      return NextResponse.json({
        error: `message with ${id} doesn't exists`,
      }, {status: 404})
    }

    return NextResponse.json({
      message: "message deleted successfully",
    }, {status: 200})
  } 
  catch (err) {
    console.error("deletion error in message",err);
    return NextResponse.json({
      error: "something went wrong while deleting message",
    }, {status: 500})
  }
}



//function that update marks as read
export async function PUT(req: NextRequest, {params}: {params: Promise<{id: string}>}) {
  try {
    const {id} = await params;
    if(!id){
      return NextResponse.json({
        error: `message id is missing`,
      }, {status: 400})
    }

    const isVerified = await isLoggedIn(req);
    if (!isVerified) {
      return NextResponse.json({
        error: "Unauthorized" 
      }, { status: 401 });
    }

    await dbConnection();

    const message = await messageModel.findById(id);

    if(!message){
      return NextResponse.json({
        error: `message with ${id} doesn't exists` 
      }, { status: 404 });
    }

    if(message.markAsRead){
      return NextResponse.json({
        message: "Already marked as read" 
      }, { status: 200 });
    }

    message.markAsRead = true;
    await message.save();

    return NextResponse.json({
      message: "Message marked as read" 
    }, { status: 200 });
  } 
  catch (err) {
    console.error("updation error in message",err);
    return NextResponse.json({
      error: "something went wrong while updating message",
    }, {status: 500})
  }
}