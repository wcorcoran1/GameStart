import React, { useState } from "react";
import "../style/GameCard.css";
import { deleteCartItem } from "../api";
import useAuth from "../hooks/useAuth";

const GameCard = ({ game, setSelectedGame, selectedGame, userCart, setUserCart }) => {

  const {token} = useAuth()
  const handleClick = () => {
    setSelectedGame(game);
  };
  const handleDelete = async (e) => {
    e.stopPropagation()
    const newCart = userCart.filter((cartItem)=>{return cartItem.cartId !== game.cartId})
    console.log(newCart, "THIS IS NEW CART BEFORE")
    await deleteCartItem(game.cartId, token)

    setUserCart(newCart)
    console.log(userCart,"THIS IS USER CART AFTER")
  }

  return (
    <div className={`gamecard${game.cartId ? "cart" : ""}`} id={game.id} onClick={handleClick}>
      <div>
        <img src="/images/gameplaceholder.png" alt="not found" />
      </div>
      <div className="gametext">
        {game.cartId ? null : <h4>${game.cost}</h4>}
        <div className="gameinfo">
          <h5>{game.name}</h5>
        </div>
        <p className="gameinfo">
          {game.description.length > 50
            ? game.description.slice(0, 80) + "..."
            : game.description}
        </p>
        <p>
          <strong>Players: </strong>
          {game.players}
        </p>
        <p>
          <strong>Rating: </strong>
          {game.age_rating}
        </p>
        {game.cartId ? <p>{game.quantity} x {game.cost}</p>: null}
        {userCart ? (
          <>
            <button>Edit Quantity</button>
            <button onClick={handleDelete}>Remove From Cart</button>
          </>
        ) : null}
      </div>
      {game.cartId ?       <div>
        <h4>${game.total_cost}</h4>
      </div>: null}

    </div>
  );
};

export default GameCard;
