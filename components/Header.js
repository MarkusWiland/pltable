import { getServerSession } from "next-auth";
import { options } from "../app/api/auth/[...nextauth]/options";
import Link from "next/link";
import React from "react";
import SignOut from "./SignOut";
import Image from "next/image";

export default async function Header() {
  const session = await getServerSession(options);

  return (
    <header className="header">
      <nav className="headerNav">
        <ul>
          <li>
            <Link href="/">start</Link>
          </li>
          <li>
            <Link href="/rules">Regler</Link>
          </li>
          <li>
            <Link href="/table">Tabell</Link>
          </li>
          {session ? (
            <>
              <li>
                <Link href="/createTable">Skapa Tabell</Link>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
        {session ? (
          <>
            <div className="headerImage">
              {session?.user?.image ? (
                <Image
                  src={session?.user?.image}
                  width={30}
                  height={30}
                  alt={session?.name ?? "Profile Pic"}
                  priority={true}
                />
              ) : null}{" "}
              <Link href={`/profile/${session?.user?.id}`}>
                {session?.user?.name}
              </Link>{" "}
              <SignOut />{" "}
            </div>
          </>
        ) : (
          <Link href="/signin" as={"/signin"}>
            Logga In
          </Link>
        )}
      </nav>
    </header>
  );
}
