import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { saveGithubCredentials } from "@/app/actions/saveGithubCredentials";

interface GitHubProfile {
  login: string;
  [key: string]: any;
}

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: { params: { scope: "repo user" } },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "defaultsecret",
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        const githubUsername = (profile as GitHubProfile)?.login;
        const accessToken = account.access_token;
        const accessSecret = ""; // GitHub doesn't provide a secret, but X (Twitter) might later

        if (githubUsername && accessToken) {
          await saveGithubCredentials({
            github_username: githubUsername,
            access_token: accessToken,
            access_secret: accessSecret, // Can remain "" or NULL for now
          });
        }
      }
      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
