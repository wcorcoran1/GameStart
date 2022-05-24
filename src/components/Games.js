import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import GameCard from "./GameCard";
import SingleGame from "./SingleGame";
import GamesSortBar from "./GamesSortBar";
import "../style/Games.css";

const Games = () => {
  const { gamesList, setGamesList } = useAuth();
  const [sortGames, setSortGames] = useState("");
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    setGamesList(gamesList);
  }, [sortGames]);

  console.log(gamesList, "games file");

  return (
    <div className="gamepage">
      {selectedGame ? (
        <SingleGame
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
        />
      ) : (
        <div className="games">
          {gamesList ? (
            <>
              <GamesSortBar sortGames={sortGames} setSortGames={setSortGames} />
              {gamesList.map((game) => {
                return (
                  <GameCard
                    key={game.id}
                    game={game}
                    selectedGame={selectedGame}
                    setSelectedGame={setSelectedGame}
                  />
                );
              })}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Games;
