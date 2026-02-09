import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabase";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // Authenticate with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });

        if (error || !data.user) {
            console.error("Auth Error:", error?.message);
            // Throwing error allows NextAuth to display it on the client
            throw new Error(error?.message || "Invalid credentials");
        }

        // Return user object
        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.full_name || data.user.email,
          image: data.user.user_metadata?.avatar_url,
          role: data.user.user_metadata?.role || 'client',
        };
      }
    })
  ],
  pages: {
    signIn: '/dubai', // Custom login page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
      async jwt({ token, user }) {
          if (user) {
              token.id = user.id;
              token.role = (user as any).role;
          }
          return token;
      },
      async session({ session, token }) {
          if (session?.user) {
              (session.user as any).id = token.id;
              (session.user as any).role = token.role;
          }
          return session;
      }
  }
};
