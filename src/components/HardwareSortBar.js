import React from "react";
import useAuth from "../hooks/useAuth";
import "../style/HardwareSortBar.css";

const HardwareSortBar = ({ setSortHardwares }) => {
  const { hardwareList, setHardwareList } = useAuth();

  const sortOptions = [
    "Top Sellers",
    "Prices Low to High",
    "Prices High to Low",
    "Product Name A-Z",
    "Product Name Z-A",
  ];

  const handleSelect = (e) => {
    console.log("Clicked select menu", e.target.value);
    const selection = e.target.value;
    switch (selection) {
      case "Top Sellers":
        setSortHardwares("Top Sellers");
        console.log("Top seller has been selected");
        break;
      case "Prices Low to High":
        setHardwareList(hardwareList.sort((a, b) => a.cost - b.cost));
        setSortHardwares("LowHigh");
        break;
      case "Prices High to Low":
        setHardwareList(hardwareList.sort((a, b) => b.cost - a.cost));
        setSortHardwares("HighLow");
        break;
      case "Product Name A-Z":
        setHardwareList(
          hardwareList.sort((a, b) =>
            a.model.toLowerCase() < b.model.toLowerCase() ? -1 : 1
          )
        );
        setSortHardwares("AtoZ");
        break;
      case "Product Name Z-A":
        setHardwareList(
          hardwareList.sort((a, b) =>
            a.model.toLowerCase() > b.model.toLowerCase() ? -1 : 1
          )
        );
        setSortHardwares("ZtoA");
        break;
    }
    console.log("This is the hardwareList in sorting:", hardwareList);
  };

  return (
    <div className="sortfilt">
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

export default HardwareSortBar;
