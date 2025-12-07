import React from "react";

export default function GameCard({ game }) {
  // 1. Define League Colors for the "Badge"
  const getLeagueStyle = (league) => {
    switch (league) {
      // MAJOR 3
      case "NFL":
        return { bg: "#003369", text: "#fff", border: "#004C99" }; // Deep Blue
      case "NBA":
        return { bg: "#C9082A", text: "#fff", border: "#E01E40" }; // Jersey Red
      case "NHL":
        return { bg: "#000000", text: "#00FFFF", border: "#333" }; // Cyberpunk Black/Cyan

      // THE NEW ADDITIONS
      case "MLB":
        return { bg: "#005A9C", text: "#fff", border: "#333" }; // Royal Blue
      case "WNBA":
        return { bg: "#FA4616", text: "#fff", border: "#333" }; // Fire Orange
      case "MLS":
        return { bg: "#1F8B4C", text: "#fff", border: "#333" }; // Pitch Green

      default:
        return { bg: "#333", text: "#ddd", border: "#555" };
    }
  };

  const style = getLeagueStyle(game.league);

  return (
    <div className="game-card">
      {/* HEADER: League Badge + Time */}
      <div className="card-header" style={{ marginBottom: "12px" }}>
        <span
          style={{
            backgroundColor: style.bg,
            color: style.text,
            border: `1px solid ${style.border}`,
            padding: "2px 6px",
            borderRadius: "4px",
            fontWeight: "bold",
            fontSize: "10px",
          }}
        >
          {game.league}
        </span>
        <span style={{ color: "#fff", fontWeight: "bold" }}>{game.time}</span>
      </div>

      {/* MATCHUP */}
      <div
        className="matchup"
        style={{ display: "flex", flexDirection: "column", gap: "4px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{game.teams.away}</span>
          <span style={{ color: "#666", fontSize: "10px" }}>AWAY</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#00ff00",
          }}
        >
          <span>@{game.teams.home}</span>
          <span style={{ color: "#007700", fontSize: "10px" }}>HOME</span>
        </div>
      </div>

      {/* FOOTER */}
      <div
        className="venue"
        style={{ marginTop: "12px", fontStyle: "italic", color: "#666" }}
      >
        {game.venue.name}
      </div>
    </div>
  );
}
