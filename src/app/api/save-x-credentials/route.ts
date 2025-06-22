// app/api/save-x-credentials/route.ts
import { saveXCredentials } from "@/app/actions/saveXCredentials";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { githubUsername, access_token, access_secret } = body;

    const result = await saveXCredentials({ githubUsername, access_token, access_secret });

    return NextResponse.json(result);
  } catch (error) {
    console.error("API save error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
