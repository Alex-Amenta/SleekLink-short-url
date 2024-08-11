import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const userFound = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          })

          if (!userFound) throw new Error('Usuario con ese email no existe');

          const matchedPassword = await bcrypt.compare(credentials.password, userFound.password_hash);

          if (!matchedPassword) throw new Error('Contraseña incorrecta');

          return {
            id: userFound.id,
            name: userFound.name,
            email: userFound.email,
            image: userFound.image || "https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user2-256.png",
          }

        } catch (error) {
          console.error('Error en la autorización:', error.message);
          throw new Error(error.message);
        }
      }
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.provider !== 'credentials') {
        token.accessToken = account.access_token;
      }

      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;

      // Solo incluir accessToken en la sesión si está definido
      if (token.accessToken) {
        session.accessToken = token.accessToken;
      }
      return session;
    },

    async signIn({ user, account }) {
      const { name, email, image } = user;

      //manejo especifico para google
      if (account.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: email }
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name,
              email,
              image
            }
          })
        }
      }
      return true;
    }
  },
  async redirect({ url, baseUrl }) {
    return baseUrl;
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };