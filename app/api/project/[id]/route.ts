import dbConnection from "@/lib/db";
import { projectModel } from "@/models/project.model";
import { isLoggedIn } from "@/utils/auth.utils";
import { NextRequest, NextResponse } from "next/server";

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