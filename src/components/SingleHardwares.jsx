import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { createHardware } from "../api/hardware.js";

const SingleHardware = ({ selectedHardware, setSelectedHardware }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedMsg, setAddedMsg] = useState("");
  const { user, token } = useAuth();
  const handleClickTwo = () => {
    setSelectedHardware(null);
    setAddedMsg("");
  };
  const handleAddToTheCart = (e) => {
    e.preventDefault();
    console.log(user, "Inside the add cart function");
    const addCart = createHardware(user, selectedHardware, quantity, token);
    setAddedMsg("" + selectedHardware.model + " has been added to your cart!");
    console.log(addCart);
  };
  return (
    <div>
      <button onClick={handleClickTwo}>Back to all the Accessories!!</button>
      {addedMsg ? (
        <h2>{addedMsg}</h2>
      ) : (
        <div className="single-hardwarecard">
          <div>
            <img src="/PC-Gaming.jpeg" alt="not found" />
          </div>
          <div className="hardwaretext">
            <h4>{selectedHardware.model}</h4>
            <div className="selectedHardwareinfo">
              <h5>{selectedHardware.description}</h5>
            </div>
            <p className="selectedHardwareinfo">${selectedHardware.cost}</p>
          </div>
          <form onSubmit={(e) => handleAddToTheCart(e)}>
            <input
              type="number"
              min="1"
              placeholder="1"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
            <button>Add to the cart</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SingleHardware;
