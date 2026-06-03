import dbConnection from "@/lib/db";
import { projectModel } from "@/models/project.model";
import { isLoggedIn } from "@/utils/auth.utils";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest){
  try {
    const isVerified = await isLoggedIn(req);
    if(!isVerified){
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    await dbConnection();

    const projects = await projectModel.find();

    return NextResponse.json({
      message: "project is fetched successfully",
      data: projects
    }, {status: 200})
  }
  catch (err) {
    return NextResponse.json({
      error: "something went wrong while fetching"
    }, {status: 500})
  }
}



export async function POST(req: NextRequest){
  try {
    const isVerified = await isLoggedIn(req);
    if(!isVerified){
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    //extract the payload form request
    const {name, description, techStack, liveLink, githubLink} = await req.json();

    await dbConnection();

    await projectModel.create({
      name,
      description,
      techStack,
      liveLink,
      githubLink
    })

    return NextResponse.json({
      message: "project is added successfully"
    }, {status: 201})
  } 
  catch (err) {
    return NextResponse.json({
      error: "something went wrong while creaing project"
    }, {status: 500})
  }
}