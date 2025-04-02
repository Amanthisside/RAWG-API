import React, { useEffect, useState } from "react";

const API_KEY = "9c2d37cb96d34695b64f444f7a0ec338n"; // Replace with your RAWG API key
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
const GameCards = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(API_URL);
        const contentType= response.headers.get("Content-Type");
        console.log("Content-Type:", contentType); 
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Invalid response type");
        }
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGames();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px" }}>
      {games.map((game) => (
        <div key={game.id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "8px", width: "200px" }}>
          <img src={game.background_image} alt={game.name} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
          <h3>{game.name}</h3>
          <p>Price: ${game.suggestions_count || "N/A"}</p>
          <button style={{ marginTop: "10px", padding: "5px 10px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default GameCards;