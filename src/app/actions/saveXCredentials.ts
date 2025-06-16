// app/actions/saveXCredentials.ts
"use server";

import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config();

const sql = neon(process.env.DATABASE_URL!); 

export async function saveXCredentials(credentials: {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessSecret: string;
  clientSecret: string;
}) {
  try {
    await sql`
      INSERT INTO x_credentials (api_key, api_secret, access_token, access_secret, client_secret)
      VALUES (${credentials.apiKey}, ${credentials.apiSecret}, ${credentials.accessToken}, ${credentials.accessSecret}, ${credentials.clientSecret});
    `;
    return { success: true };
  } catch (error) {
    console.error("Error saving credentials:", error);
    return { success: false, error };
  }
}
