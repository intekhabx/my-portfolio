import dbConnection from "@/lib/db";
import { imagekit } from "@/lib/imagekit";
import { projectModel } from "@/models/project.model";
import { isLoggedIn } from "@/utils/auth.utils";
import { NextRequest, NextResponse } from "next/server";


// function to delete project
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isVerified = await isLoggedIn(req);

    if (!isVerified) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnection();

    const { id } = await params;

    const deleted = await projectModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Project removed successfully" },
      { status: 200 }
    );
  } 
  catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong while deleting project" },
      { status: 500 }
    );
  }
}


// not used yet - function to findproject by id
export async function GET(req: NextRequest, {params}: {params: Promise<{id: string}>}){
  try {
    const isVerified = await isLoggedIn(req);
    if(!isVerified){
      return NextResponse.json({
        error: "Unauthorized"
      }, {status: 401})
    }

    await dbConnection();

    const {id} = await params;

    const project = await projectModel.findById(id);
    if(!project){
      return NextResponse.json({
        error: "project not found"
      }, {status: 404})
    }

    return NextResponse.json({
      message: "project fetched successfully",
      data: project
    }, {status: 200})
  } 
  catch (err) {
    console.error("updation err",err);
    return NextResponse.json({
      error: "something went wrong while updation",
    }, {status: 500})
  }
}



// function to update or edit the project field
export async function PUT(req: NextRequest, {params}: {params: Promise<{id: string}>}){
  try {
    // step:1 - check the user is admin or not (loggedIn or not)
    const isVerified = await isLoggedIn(req);
    if(!isVerified){
      return NextResponse.json({
        error: "Unauthorized"
      }, {status: 401})
    }

    // step:2 - extract the text data and file 
    const formData = await req.formData();
    // console.log(formData)
    const file = formData.get("file") as File;
    const techStack = formData.get("techStack") as string; //we can extract values one by one like this
    const {name, description, liveLink, githubLink} = Object.fromEntries(formData);

    //step:3 - check the dbConnectin because of edge runtime and extract the id from params
    await dbConnection();
    const {id} = await params;

    // step:4 - find the project and extract the image url
    const existingProject = await projectModel.findById(id);
    let url = existingProject?.image;

    // step:5 - if file extist then upload the image to imagekit and update the url
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
    
    // step:6 - update the project data
    const techStackArray = techStack.split(",").map((tech) => tech.trim());
    const updatedProject = await projectModel.findByIdAndUpdate(id, {
      name,
      description,
      liveLink,
      githubLink,
      techStack: techStackArray,
      image: url,
    }, {new: true});

    if(!updatedProject){
      return NextResponse.json({
        error: "faild to update project"
      }, {status: 400})
    }

    return NextResponse.json({
      message: "project updated successfully",
      data: updatedProject
    }, {status: 200})
  } 
  catch (err) {
    console.error("updation err",err);
    return NextResponse.json({
      error: "something went wrong while updation",
    }, {status: 500})
  }
}




export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}){
  try {
    // step:1 - check the user is admin or not (loggedIn or not)
    const isVerified = await isLoggedIn(req);
    if(!isVerified){
      return NextResponse.json({
        error: "Unauthorized"
      }, {status: 401})
    }

    // step:2 - check the dbConnection because of edge runtime and extract id form params
    await dbConnection();
    const {id} = await params;

    // step:3 - update the project based on old isVisible value
    const updatedProject = await projectModel.findByIdAndUpdate(id,
      [{$set: { isVisible: { $not: "$isVisible" } } }],
      { returnDocument: "after", updatePipeline: true }
    );

    return NextResponse.json({
      message: "project updated successfully",
      data: updatedProject
    }, {status: 200})
  } 
  catch (err) {
    console.error("isVisible updation err",err);
    return NextResponse.json({
      error: "something went wrong while updation",
    }, {status: 500})
  }
}
