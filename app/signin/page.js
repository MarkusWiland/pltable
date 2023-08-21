import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import TableCard from "../../components/TableCard";
export default async function ServerPage() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  return (
    <section className="flex flex-col gap-6">
      <TableCard user={session?.user} pagetype={"Server"} />
    </section>
  );
}
