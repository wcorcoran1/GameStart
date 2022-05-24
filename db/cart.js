const client = require("./client");

async function createCart({
  usersId,
  gamesId,
  hardwareId,
  quantity,
  total_cost
}) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
          INSERT INTO cart("usersId", "gamesId", "hardwareId", quantity, total_cost)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *;
          `,
      [usersId, gamesId, hardwareId, quantity, total_cost]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function getAllCarts() {
  try {
    const { rows: cart } = await client.query(`
              SELECT *
              FROM cart;
            `);

    return cart;
  } catch (error) {
    throw error;
  }
}

async function getCartById(id) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
          SELECT *
          FROM cart;
          WHERE id=${id}
          `
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function updateCart({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
              UPDATE cart
              SET ${setString}
              WHERE id=${id}
              RETURNING *
          `,
      Object.values(fields)
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function deleteCart(id) {
  try {
    const {
      rows: [carts],
    } = await client.query(
      `
              DELETE FROM cart
              WHERE cart.id=$1
              RETURNING *;
              `,
      [id]
    );
    console.log(carts, "INSIDE CART DB DELETE")
return carts
  } catch (error) {
    throw error;
  }
}

async function getCartByUser(usersId) {
  console.log(usersId, "inside card db")
  try {
    const { rows: cart } = await client.query(`
        SELECT *, cart.id AS "cartId"
        FROM cart
        JOIN games ON cart."gamesId"=games.id 
        WHERE "usersId"=$1;
      `, [usersId]);

    
console.log(cart)
    return cart;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  updateCart,
  getCartByUser,
  deleteCart,
};
