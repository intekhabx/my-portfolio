import dbConnection from "@/lib/db";
import { projectModel } from "@/models/project.model";
import { isLoggedIn } from "@/utils/auth.utils";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, {params}: {params: {id: string}}){
  try {
    const isVerified = await isLoggedIn(req);
    if(!isVerified){
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    await dbConnection();

    const {id} = await params;

    const deleted = await projectModel.findByIdAndDelete(id);
    if(!deleted){
      return NextResponse.json({
      error: "project with id doesn't exist"
    }, {status: 404})
    }

    return NextResponse.json({
      message: "project removed successfully"
    }, {status: 200})
  } 
  catch (err) {
    return NextResponse.json({
      error: "something went wrong while deleting project"
    }, {status: 500})
  }
}