import React, { useState, useEffect } from "react";
import "./styles.css";
import { TODAYS_GAMES } from "./mockData";
import { getDistanceFromLatLonInMiles } from "./distance";
import GameCard from "./GameCard";

export default function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [statusMsg, setStatusMsg] = useState("Locating...");
  const [todaysGames, setTodaysGames] = useState([]);

  // --- CONFIGURATION ---

  // --- DATE LOGIC ---
  const todayObj = new Date();
  const year = todayObj.getFullYear();
  const month = String(todayObj.getMonth() + 1).padStart(2, "0");
  const day = String(todayObj.getDate()).padStart(2, "0");

  // 1. FOR THE ROBOT (Keep this YYYY-MM-DD so matching works)
  const TODAY_ISO = `${year}-${month}-${day}`;

  // 2. FOR THE HUMAN (This is the American style you want)
  const displayDate = `${month}-${day}-${year}`;

  // 1. GET LOCATION
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setStatusMsg("Location Found");
      },
      (err) => setStatusMsg("Location Access Denied")
    );
  }, []);

  // 2. FILTER LOGIC (Location + Date Match)
  useEffect(() => {
    if (userLocation) {
      const radius = 50; // Miles

      const filtered = TODAYS_GAMES.filter((game) => {
        // A. Date Check: Must match TODAY_ISO exactly
        const isToday = game.date === TODAY_ISO;

        // B. Distance Check
        const distance = getDistanceFromLatLonInMiles(
          userLocation.lat,
          userLocation.lng,
          game.venue.lat,
          game.venue.lng
        );

        return isToday && distance <= radius;
      });

      setTodaysGames(filtered);
    }
  }, [userLocation]);

  return (
    <div className="container">
      <header>
        <h1>Games Near Me</h1>

        {/* NEW: Show the date right under the title */}
        <div
          style={{ fontSize: "1.2rem", color: "#ccc", marginBottom: "10px" }}
        >
          {displayDate}
        </div>

        <div
          className="status"
          style={{ color: userLocation ? "#00ff00" : "#ffaa00" }}
        >
          STATUS: {statusMsg}
        </div>
      </header>

      <main>
        {!userLocation ? (
          <div className="no-games">Waiting for location...</div>
        ) : todaysGames.length > 0 ? (
          <>
            {/* We don't need the date-header here anymore since it's at the top now */}

            {todaysGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </>
        ) : (
          <div className="no-games">
            <p>NO GAMES NEARBY TODAY.</p>
            {/* Debug info uses the Robot Date so you know what it checked */}
            <p style={{ fontSize: "11px", marginTop: "10px", color: "#666" }}>
              (Checked 50 mile radius for {TODAY_ISO})
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
