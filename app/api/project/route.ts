import dbConnection from "@/lib/db";
import { imagekit } from "@/lib/imagekit";
import { projectModel } from "@/models/project.model";
import { isLoggedIn } from "@/utils/auth.utils";
import { NextRequest, NextResponse } from "next/server";


// function that fetch all project
export async function GET(req: NextRequest){
  try {
    const isVerified = await isLoggedIn(req);
    if(!isVerified){
      return NextResponse.json({
        error: "Unauthorized" 
      }, { status: 401 });
    }

    await dbConnection();

    const projects = await projectModel.find({}).sort({createdAt: -1}).lean();

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



// fucntion to create or add project
export async function POST(req: NextRequest){
  try {
    const isVerified = await isLoggedIn(req);
    if (!isVerified) {
      return NextResponse.json({
        error: "Unauthorized" 
      }, { status: 401 });
    }

    const formData = await req.formData();
    // console.log(formData);

    const file = formData.get("file") as File;
    const techStack = formData.get("techStack") as string; //we can extract one by one like this
    const {name, description, liveLink, githubLink} = Object.fromEntries(formData);


    let url;
    if(file){
      //1. File ko Buffer mein convert
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
  
      // 2. ImageKit par upload
      const uploadRes = await imagekit.upload({
        file: buffer,
        fileName: `${Date.now()}_${file.name}`,
        folder: "/projects",
      });

      url = uploadRes.url;
    }


    await dbConnection();

    const techStackArray = techStack.split(",").map((tech) => tech.trim());
    await projectModel.create({
      name,
      description,
      liveLink,
      githubLink,
      techStack: techStackArray,
      image: url,
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