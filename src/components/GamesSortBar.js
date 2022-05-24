import React from "react";
import useAuth from "../hooks/useAuth";
import "../style/GamesSortBar.css";

const GamesSortBar = ({ sortGames, setSortGames }) => {
  const { gamesList, setGamesList } = useAuth();

  const sortOptions = [
    "Top Sellers",
    "Price Low to High",
    "Price High to Low",
    "Product Name A-Z",
    "Product Name Z-A",
  ];

  const handleSelect = (e) => {
    console.log("Clicked select menu", e.target.value);
    const selection = e.target.value;
    switch (selection) {
      case "Top Sellers":
        setSortGames("TopSellers");
        console.log("top sellers was selected");
        break;
      case "Price Low to High":
        setGamesList(gamesList.sort((a, b) => a.cost - b.cost));
        setSortGames("LowHigh");
        break;
      case "Price High to Low":
        setGamesList(gamesList.sort((a, b) => b.cost - a.cost));
        setSortGames("HighLow");
        break;
      case "Product Name A-Z":
        setGamesList(
          gamesList.sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
          )
        );
        setSortGames("AtoZ");
        break;
      case "Product Name Z-A":
        setGamesList(
          gamesList.sort((a, b) =>
            a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
          )
        );
        setSortGames("ZtoA");
        break;
    }
    console.log("THIS IS THE GAMESLIST IN SORTING:", gamesList);
  };

  return (
    <div className="sortfilter">
      <h6>
        Sort By:
        <select onChange={handleSelect}>
          {sortOptions.map((each, i) => {
            return (
              <option key={i} value={each}>
                {each}
              </option>
            );
          })}
        </select>
      </h6>
    </div>
  );
};

export default GamesSortBar;
