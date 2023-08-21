"use client";
import { getBackgroundColor } from "@/helpers/functions";
import { tabell } from "@/utils/data";
import supabase from "@/utils/supabaseClient";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";

export default function table() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await supabase.from("users").select("*");
      setUsers(data);
    };
    fetchUsers();
  }, []);
  const evaluate = (selectedPerson, name) => {
    const referenceRank = selectedPerson?.tabell?.findIndex(
      (e) => e?.selectedTeam?.value === name
    );
    const actualRank = tabell.findIndex((e) => e.name === name);
    const points = Math.max(0, 3 - Math.abs(referenceRank - actualRank));
    return points;
  };
  return (
    <section className="tablePage">
      <div>
        <h1>Premier league Tabell</h1>
        <table className="modalTable">
          <thead>
            <tr>
              <th>Position</th>
              <th>Logo</th>
              <th>Lag</th>
            </tr>
          </thead>
          <tbody>
            {tabell?.map((row, index) => (
              <tr key={`row-${index}`}>
                <td>{index + 1}</td>
                <td>
                  <Image src={row.icon} width={20} height={20} alt={row.name} />
                </td>
                <td>{row.name}</td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td>Total: {tabell.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1>Din Tabell</h1>
        <table className="modalTable">
          <thead>
            <tr>
              <th>Position</th>
              <th>Logo</th>
              <th>Lag</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((contact, userIndex) => (
              <Fragment key={`user-${userIndex}`}>
                {contact?.tabell?.map((row, rowIndex) => (
                  <tr key={`row-${userIndex}-${rowIndex}`}>
                    <td>{rowIndex + 1}</td>
                    <td>
                      <Image
                        src={row?.selectedTeam?.icon}
                        width={20}
                        height={20}
                        alt={row?.selectedTeam?.value}
                      />
                    </td>
                    <td>{row?.selectedTeam?.value}</td>
                    <td
                      style={{
                        backgroundColor: getBackgroundColor(
                          evaluate(contact, row?.selectedTeam?.value)
                        ),
                      }}
                    >
                      {evaluate(contact, row?.selectedTeam?.value)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td>Total: 32</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
