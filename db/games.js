// This is where we made functions for a games database 
const client = require("./client");
// This function creates a new game by inserting the data into the games table.
async function createGame({ name, description, players, age_rating, cost }) {
  try {
    const {
      rows:[game],
    } = await client.query(
      `
          INSERT INTO games(name, description, players, age_rating, cost)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *;
          `,
      [name, description, players, age_rating, cost]
    );
    return game;
  } catch (error) {
    throw error;
  }
}
// This function gets all the data from the games table in the database
async function getAllGames() {
  try {
    const { rows: games } = await client.query(`
              SELECT *
              FROM games;
            `);

    return games;
  } catch (error) {
    throw error;
  }
}
// This function gets a game based on its id from the database
async function getGameById(id) {
  try {
    const {
      rows: [game],
    } = await client.query(
      `
          SELECT *
          FROM games
          WHERE id=${id}
          `
    );
    return game;
  } catch (error) {
    throw error;
  }
}
// This function updates a game's data based on its id in the database. 
async function updateGame({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [game],
    } = await client.query(
      `
              UPDATE games
              SET ${setString}
              WHERE id=${id}
              RETURNING *
          `,
      Object.values(fields)
    );
    return game;
  } catch (error) {
    throw error;
  }
}
// This function deletes a game from the database based on its id.
async function deleteGame(id) {
  
    try {
      const {
        rows: [game],
      } = await client.query(
        `
                DELETE games
                WHERE id=$1
                RETURNING *;
                `,
        [id]
      );
  
      return game;
    } catch (error) {
      throw error;
    }
  
}
// This function attaches games to platforms by joining through the platformGames table.
async function attachGamesToPlatforms(platforms){
  console.log(platforms, "WHAT IS THIS INSIDE GAMES")
  // no side effects
  const platformsToReturn = [...platforms];
  const binds = platforms.map((_, index) => `$${index + 1}`).join(", ");
  console.log(binds, "")
  const platformIds = platforms.map((platform) => platform.id);
  if (!platformIds?.length) return [];

  try {

    // get the games, JOIN with platform-games (so we can get a platformId), and only those that have those platform ids on the platform-games join

    const { rows: games } = await client.query(
      `
        SELECT games.*, platform_games."platformId"
        FROM games 
        JOIN platform_games ON platform_games."gamesId" = games.id
        WHERE platform_games."platformId" IN (${binds});
      `,
      platformIds
    );
console.log(games, "AFTER QUERY ATTACHGAMESTOPLATFORM")

    // loop over the platforms
    for (const platform of platformsToReturn) {
      // filter the games to only include those that have this platformId

      const gamesToAdd = games.filter(
        (game) => game.platformId === platform.id
      );

      // attach the games to each single platform

      platform.games = gamesToAdd;
    }
    return platformsToReturn;
  } catch (error) {
    throw error;
  }
}

// async function attachGamesToCarts(carts) {
//   // no side effects
//   const cartsToReturn = [...carts];
//   const binds = carts.map((_, index) => `$${index + 1}`).join(', ');
//   const cartIds = carts.map(cartItem => cartItem.id);
//   if (!cartIds?.length) return [];

//   try {
    
//     const { rows: cart } = await client.query(`     
//     SELECT games.name, games.cost, cart.*
//         FROM cart 
//         RIGHT JOIN games ON cart."gamesId" = games.id
//         WHERE cart.id IN (${binds});
//       `, cartIds);
// return cart


//   } catch (error) {
//     throw error;
//   }
// }


module.exports = {
  createGame,
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
  attachGamesToPlatforms,
  // attachGamesToCarts
};
