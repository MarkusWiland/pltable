"use client";

import supabase from "@/utils/supabaseClient";
import { useState, useEffect } from "react";
import Modal from "./modal";
import { tabell } from "@/utils/data";
import { getBackgroundColor } from "@/helpers/functions";
export default function TableCard() {
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
  console.log("users", users);
  return (
    <div>
      <header className="flex items-center justify-between bg-blue-950 p-4">
        <h1>Alla användare</h1>
        {users?.map((contact) => (
          <Modal key={contact.id}>
            <Modal.Button asChild>
              <button className="btn">{contact.name}</button>
            </Modal.Button>

            <Modal.Content title={contact.name}>
              <div className="mt-4 space-y-3 text-gray-600">
                <p>Din tabell</p>
                <table>
                  <thead>
                    <tr>
                      <th>Position</th>
                      <th>Logo</th>
                      <th>Lag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contact?.tabell?.map((row, index) => (
                      <tr key={`row-${index}-${row?.selectedTeam?.id}`}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={row?.selectedTeam?.icon}
                            width="20px"
                            height="20px"
                            alt="team"
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
                  </tbody>
                </table>
              </div>
            </Modal.Content>
          </Modal>
        ))}
      </header>
    </div>
  );
}
