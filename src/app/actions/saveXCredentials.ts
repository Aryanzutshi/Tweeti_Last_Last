// app/actions/saveXCredentials.ts
'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function saveXCredentials({
  githubUsername,
  access_token,
  access_secret,
}: {
  githubUsername: string;
  access_token: string;
  access_secret: string;
}) {
  await sql`
    INSERT INTO x_credentials (access_token, access_secret, github_username)
    VALUES (${access_token}, ${access_secret}, ${githubUsername});
  `;
  return { success: true };
}
