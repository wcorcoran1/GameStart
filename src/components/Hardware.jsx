import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import HardwareCard from "./HardwareCard";
import SingleHardware from "./SingleHardwares";
import HardwareSortBar from "./HardwareSortBar";
import "../style/Hardware.css";

const Hardware = () => {
  const { hardwareList, setHardwareList } = useAuth();
  const [sortHardwares, setSortHardwares] = useState("");
  const [selectedHardware, setSelectedHardware] = useState(null);

  useEffect(() => {
    setHardwareList(hardwareList);
  }, [sortHardwares]);

  console.log(hardwareList, "hardware file");

  return (
    <div className="hardwarepage">
      {selectedHardware ? (
        <SingleHardware
          selectedHardware={selectedHardware}
          setSelectedHardware={setSelectedHardware}
        />
      ) : (
        <div className="hardware">
          {hardwareList ? (
            <>
              <HardwareSortBar
                sortHardwares={sortHardwares}
                setSortHardwares={setSortHardwares}
              />
              {hardwareList.map((hardware) => {
                return (
                  <HardwareCard
                    key={hardware.id}
                    hardware={hardware}
                    selectedHardware={selectedHardware}
                    setSelectedHardware={setSelectedHardware}
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
export default Hardware;
