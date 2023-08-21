"use client";
import { signOut } from "next-auth/react";

import React from "react";

export default function SignOut() {
  return <button onClick={() => signOut()} className="signOutBtn">Logga ut</button>;
}
