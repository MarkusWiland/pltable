import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import TableCard from "../components/TableCard";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <>
      {session ? (
        <TableCard  />
      ) : (
        <div>
          <h1 className="h">Du måste logga in för att se alla tabeller</h1>
        </div>
      )}
    </>
  );
}
