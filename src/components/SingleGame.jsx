import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { createGameCartItem } from "../api/index.js";

const SingleGame = ({ selectedGame, setSelectedGame }) => {
  const [qty, setQty] = useState(1);
  const [addedMsg, setAddedMsg] = useState("");
  const { user, token } = useAuth();
  const handleClick = () => {
    setSelectedGame(null);
    setAddedMsg("");
  };
  const handleAddToCart = async (e) => {
    e.preventDefault();
    console.log(user, "inside the add to card function");
    const cartAdd = await createGameCartItem(user, selectedGame, qty, token);
    setAddedMsg(
      qty + " " + selectedGame.name + " has been added to your cart!"
    );
    console.log(cartAdd);
  };
  return (
    <div>
      <button onClick={handleClick}>Back to All Games</button>
      {addedMsg ? (
        <h2>{addedMsg}</h2>
      ) : (
        <div className="single-gamecard">
          <div>
            <img src="/images/gameplaceholder.png" alt="not found" />
          </div>
          <div className="gametext">
            <h4>${selectedGame.cost}</h4>
            <div className="selectedGameinfo">
              <h5>{selectedGame.name}</h5>
            </div>
            <p className="selectedGameinfo">{selectedGame.description}</p>
            <p>
              <strong>Players: </strong>
              {selectedGame.players}
            </p>
            <p>
              <strong>Rating: </strong>
              {selectedGame.age_rating}
            </p>
          </div>
          <form onSubmit={(e) => handleAddToCart(e)}>
            <input
              type="number"
              min="1"
              placeholder="1"
              value={qty}
              onChange={(e) => {
                setQty(e.target.value);
              }}
            />
            <button>Add to Cart</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SingleGame;
