import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { getCartByUserId } from "../api/index";
import GameCard from "./GameCard";
import SingleGame from "./SingleGame";
import "../style/Cart.css";

const Cart = () => {
  const { user, userCart, setUserCart } = useAuth();
  const [selectedGame, setSelectedGame] = useState(null);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchCart = async () => {
      const cartList = await getCartByUserId(user);
      console.log(cartList, "cartList");
      setUserCart(cartList);
    };
    fetchCart();
  }, []);
  console.log(user.username, "THISISUSER CART");
  console.log(userCart, "THIS IS USER CART");
  //

  useEffect(() => {
    let sum = 0;
    const totalsArray = userCart.map((each) => {
      console.log(each, "each");
      return +each.total_cost;
    });
    console.log(totalsArray);
    for (let i = 0; i < totalsArray.length; i++) {
      sum += totalsArray[i];
    }
    console.log(sum);
    setTotal(sum);
  }, [userCart]);

  return (
    <div className="cartpage">
      {selectedGame ? (
        <SingleGame
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
        />
      ) : (
        <>
          {user.username ? (
            <>
              <div className="cart">
                {userCart && userCart.length > 0 ? (
                  <>
                    <div className="total">
                      <button>Checkout</button>
                      {total && total > 0 ? (
                        <h2>Your cart total is ${total}</h2>
                      ) : null}
                    </div>
                    {userCart.map((game) => {
                      return (
                        <div key={game.cartId}>
                          <GameCard
                            userCart={userCart}
                            key={game.cartId}
                            game={game}
                            selectedGame={selectedGame}
                            setSelectedGame={setSelectedGame}
                            setUserCart={setUserCart}
                            setTotal={setTotal}
                          />
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="total">
                    <h1>There are no items in your cart</h1>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="total">
              <h1>Please login to access your cart</h1>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
