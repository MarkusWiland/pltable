// next-auth.config.js
import { session } from "next-auth";

export default {
  // Other configuration options...

  session: {
    // Use the "supabase" storage provider
    storage: "supabase",
    // Set the properties required for Supabase session storage
    // These values should come from your Supabase project settings
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
};
