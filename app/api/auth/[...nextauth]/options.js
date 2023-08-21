import TwitterProvider from "next-auth/providers/twitter";
import { SupabaseAdapter } from "@auth/supabase-adapter";
export const options = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY,
    persistSession: false,
  }),
  callbacks: {
    async session({ session, user }) {
      console.log("user", user);
      if (user) {
        session.user = user;
      }

      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
