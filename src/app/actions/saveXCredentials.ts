// app/actions/saveXCredentials.ts
'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function saveXCredentials({
  access_token,
  access_secret,
}: {
  access_token: string;
  access_secret: string;
}) {
  await sql`
    INSERT INTO x_credentials (access_token, access_secret)
    VALUES (${access_token}, ${access_secret});
  `;
  return { success: true };
}
