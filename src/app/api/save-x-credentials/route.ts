// /app/api/save-x-credentials/route.ts
import { NextResponse } from "next/server";
import { saveXCredentials } from "@/app/actions/saveXCredentials";

export async function POST(req: Request) {
  try {
    const { github_username, access_token, access_secret } = await req.json();

    console.log("📥 Incoming request:", { github_username, access_token, access_secret });

    if (!github_username || !access_token || !access_secret) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await saveXCredentials({ github_username, access_token, access_secret });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("🔥 API Error:", err);
    return NextResponse.json(
      { error: "Failed to save credentials" },
      { status: 500 }
    );
  }
}
