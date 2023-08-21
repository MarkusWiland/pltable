import supabase from "@/utils/supabaseClient";
import Image from "next/image";
import React from "react";

export default async function profile({ params }) {
  const { id } = params;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  console.log("data", data.tabell);
  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.email}</p>
      <p>{data?.id}</p>
      <Image src={data?.image} width={200} height={200} />
      {JSON.stringify(data?.tabell, null, 2)}
    </div>
  );
}
