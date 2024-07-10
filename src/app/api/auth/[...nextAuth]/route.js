import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { createUserGoogle } from "../../controllers/userController";
import jwt from "jsonwebtoken"
import { secretKey } from "../../controllers/auth";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    jwt: true,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error("No profile");
      }

      const { name, email, image } = profile;

      try {
        const userId = await createUserGoogle(name, email, image);
        profile.id = userId;
      } catch (error) {
        console.error("Error during signIn:", error);
        throw new Error("Sign in failed");
      }

      return true;
    },

    async jwt({ token, profile, account }) {
      if (account) {
        token.id = profile?.id;
        token.jwt = jwt.sign({ userId: profile?.id }, secretKey, { expiresIn: "1h" });
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.accessToken = token.jwt;
      return session;
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  }
});

export { handler as GET, handler as POST }