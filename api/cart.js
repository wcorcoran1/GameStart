const express = require("express");
const cartRouter = express.Router();
const {
  getCartById,
  getAllCarts,
  updateCart,
  deleteCart,
  createCart,
  getCartByUser
  
} = require("../db/cart");
const { loginAuth } = require("./utils");

cartRouter.patch("/:cartId/", loginAuth, async (req, res, next) => {
  try {
    const { gameId, hardwareId, quantity, total_cost } = req.body;
    const { cartId } = req.params;
    const userId = req.user.id;
    const cart = await getCartById(cartId);

    if (req.user.id == cart.userId) {
      const updatedCart = await updateCart({
        cartId,
        userId,
        gameId,
        hardwareId,
        quantity,
        total_cost,
      });
      res.send(updatedCart);
    } else {
      res.status(401);
      next();
    }
  } catch (error) {
    next(error);
  }
});

cartRouter.post("/", loginAuth, async (req, res, next) => {
  try {
    // const { cartId } = req.params;
    const { usersId, gamesId, hardwareId, quantity, total_cost } = req.body;

    if (req.user.id) {
      const cart = await createCart({
        usersId,
        gamesId,
        hardwareId,
        quantity,
        total_cost
      });
      console.log("CART on the BACKEND",cart)
      res.send(cart);
    } else {
      res.status(401);
      next();
    }
  } catch (error) {
    throw error;
  }
});

cartRouter.delete("/:cartId", loginAuth, async (req, res, next) => {
  const { cartId } = req.params;
  try {
    const deletedCart = await deleteCart(cartId);
    console.log(deletedCart, "INSIDE DELETE API BACKEND")
    res.send(deletedCart);
  } catch (error) {
    throw error;
  }
});

cartRouter.get("/:Id", async (req, res, next) => {
  const { Id } = req.params;
  try {
console.log(Id, "---REQPARAMS---")

   
    cart = await getCartByUser(Id);
    
      res.send(cart);
    
  } catch (error) {
    throw error;
  }
});



module.exports = cartRouter;
