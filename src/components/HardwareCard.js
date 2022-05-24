import React from "react";
import useAuth from "../hooks/useAuth";
import { deleteCartItem } from "../api";
import "../style/HardwareCard.css";

const HardwareCard = ({
  hardware,
  setSelectedHardware,
  userCart,
  setUserCart,
}) => {
  const { token } = useAuth();
  const handleClick = () => {
    setSelectedHardware(hardware);
  };
  const handleDelete = async (e) => {
    e.stopPropagation();
    const newCart = userCart.filter((cartItem) => {
      return cartItem.cartId !== hardware.cartId;
    });
    console.log(newCart, "This is new cart before");
    await deleteCartItem(hardware.cartId, token);

    setUserCart(newCart);
    console.log(userCart, "This is user cart after");
  };
  return (
    <div className="hardwarecard" id={hardware.id} onClick={handleClick}>
      <div>
        <img src="/PC-Gaming.jpeg" alt="not found" />
      </div>
      <div className="hardwaretext">
        <h4>${hardware.cost}</h4>
        <div className="hardwareinfo">
          <h5>{hardware.model}</h5>
        </div>
        <p className="hardwareinfo">
          {hardware.description.length > 50
            ? hardware.description.slice(0, 80) + "..."
            : hardware.description}
        </p>
        {userCart ? (
          <>
            <button>Edit Quantity</button>
            <button onClick={handleDelete}>Remove From Cart</button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default HardwareCard;
