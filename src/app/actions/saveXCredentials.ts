// app/actions/saveXCredentials.ts
'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function saveXCredentials({
  github_username,
  access_token,
  access_secret,
}: {
  github_username: string;
  access_token: string;
  access_secret: string;
}) {
  await sql`
    UPDATE x_credentials
    SET
      access_token = ${access_token},
      access_secret = ${access_secret},
      created_at = NOW()
    WHERE github_username = ${github_username};
  `;
  return { success: true };
}
