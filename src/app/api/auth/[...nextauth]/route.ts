import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { saveGithubUsername } from "@/app/actions/saveGithubCredentials";

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
        if (githubUsername) {
          await saveGithubUsername({ github_username: githubUsername });
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
