// app/actions/saveGithubUsername.ts
'use server';

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function saveGithubUsername({
  github_username,
}: {
  github_username: string;
}) {
  await sql`
    INSERT INTO x_credentials (github_username)
    VALUES (${github_username})
  `;
  return { success: true };
}
