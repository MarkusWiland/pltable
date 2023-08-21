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
    storage: "supabase",
  }),
  callbacks: {
    async session({ session, user }) {
      console.log("user", user);
      if (user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.image = user.image;
      }
      console.log("session", session);
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
