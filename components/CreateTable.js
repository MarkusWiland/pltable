"use client";
import React, { useState } from "react";
import Select from "react-select";
const CustomOption = ({ innerProps, label, icon }) => (
  <div
    {...innerProps}
    style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}
  >
    <img src={icon} width="20px" height="20px" /> {label}
  </div>
);

import { getSession } from "next-auth/react";
import supabase from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
export default function CreateTable() {
  const router = useRouter();
  const [isCreateButtonEnabled, setCreateButtonEnabled] = useState(false);
  const [premierLeagueTeams, setPremierLeagueTeams] = useState([
    {
      id: 1,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Arsenal-FC-icon.png",
      value: "Arsenal",
      label: "Arsenal",
      isDisabled: false,
    },
    {
      id: 2,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Chelsea-FC-icon.png",
      value: "Chelsea",
      label: "Chelsea",
      isDisabled: false,
    },
    {
      id: 3,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Liverpool-FC-icon.png",
      value: "Liverpool",
      label: "Liverpool",
      isDisabled: false,
    },
    {
      id: 4,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Manchester-City-icon.png",
      value: "Manchester City",
      label: "Manchester City",
      isDisabled: false,
    },
    {
      id: 5,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Manchester-United-icon.png",
      value: "Manchester United",
      label: "Manchester United",
      isDisabled: false,
    },
    {
      id: 6,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Tottenham-Hotspur-icon.png",
      value: "Tottenham Hotspur",
      label: "Tottenham Hotspur",
      isDisabled: false,
    },
    {
      id: 7,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Brentford-FC-icon.png",
      value: "Brentford FC",
      label: "Brentford FC",
      isDisabled: false,
    },
    {
      id: 8,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/West-Ham-United-icon.png",
      value: "West Ham United",
      label: "West Ham United",
      isDisabled: false,
    },
    {
      id: 9,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Everton-FC-icon.png",
      value: "Everton",
      label: "Everton",
      isDisabled: false,
    },
    {
      id: 10,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/AFC-Bournemouth-icon.png",
      value: "AFC Bournemouth",
      label: "AFC Bournemouth",
      isDisabled: false,
    },
    {
      id: 11,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Newcastle-United-icon.png",
      value: "Newcastle United",
      label: "Newcastle United",
      isDisabled: false,
    },
    {
      id: 12,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Wolverhampton-Wanderers-icon.png",
      value: "Wolverhampton Wanderers",
      label: "Wolverhampton Wanderers",
      isDisabled: false,
    },
    {
      id: 13,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Aston-Villa-icon.png",
      value: "Aston Villa",
      label: "Aston Villa",
      isDisabled: false,
    },
    {
      id: 14,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Crystal-Palace-icon.png",
      value: "Crystal Palace",
      label: "Crystal Palace",
      isDisabled: false,
    },
    {
      id: 15,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Luton-Town-icon.png",
      value: "Luton Town",
      label: "Luton Town",
      isDisabled: false,
    },
    {
      id: 16,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Brighton-Hove-Albion-icon.png",
      value: "Brighton & Hove Albion",
      label: "Brighton & Hove Albion",
      isDisabled: false,
    },
    {
      id: 17,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Burnley-FC-icon.png",
      value: "Burnley",
      label: "Burnley",
      isDisabled: false,
    },
    {
      id: 18,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Fulham-FC-icon.png",
      value: "Fulham",
      label: "Fulham",
      isDisabled: false,
    },
    {
      id: 19,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Nottingham-Forest-icon.png",
      value: "Nottingham Forest",
      label: "Nottingham Forest",
      isDisabled: false,
    },
    {
      id: 20,
      icon: "https://icons.iconarchive.com/icons/giannis-zographos/english-football-club/256/Sheffield-United-icon.png",
      value: "Sheffield United",
      label: "Sheffield United",
      isDisabled: false,
    },
  ]);

  const [tableData, setTableData] = useState(
    premierLeagueTeams.map(() => ({ selectedTeam: null, disabled: false }))
  );
  const handleTeamSelect = (selectedOption, rowIndex) => {
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex].selectedTeam = selectedOption;
    updatedTableData[rowIndex].disabled = true;
    setTableData(updatedTableData);

    const updatedPremierLeagueTeams = premierLeagueTeams.map((team) => {
      if (team.value === selectedOption.value) {
        return { ...team, isDisabled: true };
      }
      return team;
    });
    const isCreateButtonEnabled = updatedTableData.every(
      (row) => row.selectedTeam !== null
    );
    setCreateButtonEnabled(isCreateButtonEnabled);

    setPremierLeagueTeams(updatedPremierLeagueTeams);
  };

  const handleRemoveTeam = (rowIndex) => {
    const updatedTableData = [...tableData];
    const removedTeam = updatedTableData[rowIndex].selectedTeam;
    updatedTableData[rowIndex].selectedTeam = null;
    updatedTableData[rowIndex].disabled = false;
    setTableData(updatedTableData);

    if (removedTeam) {
      const updatedPremierLeagueTeams = premierLeagueTeams.map((team) => {
        if (team.value === removedTeam.value) {
          return { ...team, isDisabled: false };
        }
        return team;
      });
      const isCreateButtonEnabled = updatedTableData.every(
        (row) => row.selectedTeam !== null
      );
      setCreateButtonEnabled(isCreateButtonEnabled);
      setPremierLeagueTeams(updatedPremierLeagueTeams);
    }
  };

  const handleCreate = async () => {
    const session = await getSession();
    const user = session?.user;

    if (session && user) {
      // Hämta användar-ID och tabellvärde från din användarobjektstruktur

      try {
        const serializedData = tableData.map((row) => {
          return {
            selectedTeam: row.selectedTeam,
            disabled: row.disabled,
          };
        });
        console.log("serializedData", serializedData);
        // Uppdatera användaren i Supabase
        const { data, error } = await supabase
          .from("users")
          .update({
            tabell: serializedData,
          })
          .eq("id", user?.id);

        if (error) {
          console.error("Fel vid uppdatering av användaruppgifter:", error);
          return;
        }
        if (!error) {
          router.push("/");
        }
        console.log("Användaruppgifter uppdaterade:", data);
      } catch (error) {
        console.error("Ett oväntat fel uppstod:", error);
      }
    }
  };

  return (
    <div>
      <table className="styledTable">
        <thead>
          <tr>
            <th>Position</th>
            <th>Logo</th>
            <th>Lag</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {row.selectedTeam && (
                  <img
                    src={row.selectedTeam.icon}
                    alt={row.selectedTeam.label}
                    style={{ width: "30px" }}
                  />
                )}
              </td>
              <td
                style={{
                  display: "flex",
                  gap: "0.25rem",
                  width: "400px",
                }}
              >
                <>
                  <Select
                    id={row.id}
                    options={premierLeagueTeams}
                    value={row.selectedTeam}
                    isDisabled={row.disabled}
                    className="select"
                    onChange={(selectedOption) =>
                      handleTeamSelect(selectedOption, index)
                    }
                    placeholder="Välj lag"
                    formatOptionLabel={({ label, value }) => {
                      const selectedTeam = premierLeagueTeams.find(
                        (team) => team.value === value
                      );
                      if (selectedTeam) {
                        return (
                          <CustomOption
                            label={label}
                            icon={selectedTeam.icon}
                          />
                        );
                      }
                      return label;
                    }}
                  />
                  <button
                    onClick={() => handleRemoveTeam(index)}
                    className={
                      !row.disabled ? "signOutBtn disabled" : "signOutBtn"
                    }
                  >
                    x
                  </button>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleCreate}
        className={
          tableData.map((row) => row.selectedTeam).includes(null)
            ? "signOutBtn disabled"
            : "signOutBtn"
        }
      >
        Skapa
      </button>
    </div>
  );
}
