// app/api/save-x-credentials/route.ts (if using App Router)

import { NextRequest, NextResponse } from 'next/server';
import { saveXCredentials } from '@/app/actions/saveXCredentials';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { access_token, access_secret } = body;

    if (!access_token || !access_secret) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await saveXCredentials({ access_token, access_secret });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ API error saving credentials:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
