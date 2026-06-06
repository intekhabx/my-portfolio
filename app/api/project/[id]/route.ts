import dbConnection from "@/lib/db";
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
export async function PATCH(req: NextRequest, {params}: {params: Promise<{id: string}>}){
  try {
    const isVerified = await isLoggedIn(req);
    if(!isVerified){
      return NextResponse.json({
        error: "Unauthorized"
      }, {status: 401})
    }

    await dbConnection();

    const {id} = await params;
    const {name, description, techStack, liveLink, githubLink} = await req.json();

    const updatedProject = await projectModel.findByIdAndUpdate(id, {
      name,
      description,
      techStack,
      liveLink,
      githubLink,
    }, {new: true})

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