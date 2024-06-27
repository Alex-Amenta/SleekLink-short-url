import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { createUserGoogle } from "../../controllers/userController";

export const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  session: {
    jwt: true, // Habilitar JWT para manejar sesiones de usuario
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile')
      }

      const { name, email, image } = profile

      try {
        await createUserGoogle(name, email, image);
      } catch (error) {
        console.error("Error during signIn:", error);
        throw new Error("Sign in failed");
      }

      return true;
    }
  },
});

export { handler as GET, handler as POST }