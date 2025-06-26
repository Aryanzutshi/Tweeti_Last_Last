// app/api/save-x-credentials/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { saveXCredentials } from '@/app/actions/saveXCredentials';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { github_username, access_token, access_secret } = body;

    // Validate input
    if (!github_username || !access_token || !access_secret) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await saveXCredentials({ github_username, access_token, access_secret });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ API error saving credentials:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
