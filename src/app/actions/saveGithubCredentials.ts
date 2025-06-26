// app/actions/saveGithubCredentials.ts
'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function saveGithubCredentials({
  github_username,
  access_token,
  access_secret,
}: {
  github_username: string;
  access_token: string;
  access_secret: string;
}) {
  await sql`
    INSERT INTO x_credentials (
      github_username,
      access_token,
      access_secret
    )
    VALUES (
      ${github_username},
      ${access_token},
      ${access_secret}
    )
    ON CONFLICT (github_username)
    DO UPDATE SET
      access_token = EXCLUDED.access_token,
      access_secret = EXCLUDED.access_secret,
      created_at = NOW(); -- optional: update timestamp
  `;

  return { success: true };
}
