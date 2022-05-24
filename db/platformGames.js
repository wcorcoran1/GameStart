// This our platform games functions that we will use for our database and API.
const client = require("./client");
// This function inserts data into our platformGames table for our database
async function createPlatformGame({ platformId, gamesId }) {
  try {
    const {
      rows: [pGames],
    } = await client.query(
      `
          INSERT INTO platform_games("platformId", "gamesId")
          VALUES ($1, $2)
          RETURNING *;
          `,
      [platformId, gamesId]
    );
    console.log(pGames, "PGAMES")
    return pGames;
  } catch (error) {
    throw error;
  }
}
// This function gets all data from our platformGames database
async function getAllPlatformGames() {
  try {
    const { rows } = await client.query(`
              SELECT * 
              FROM platform_games;
            `);

    return rows;
  } catch (error) {
    throw error;
  }
}
// This function gets our data by platformGames id that is in our database
async function getPlatformGameById(id) {
  try {
    const {
      rows: [platformGames],
    } = await client.query(
      `
        SELECT *
        FROM platform_games
        WHERE id=$1
        `,
      [id]
    );
console.log(platformGames)
    return platformGames;
  } catch (error) {
    throw error;
  }
}
// This function adds games to our platforms by platformId and gamesId
async function addGameToPlatform({ platformId, gamesId }) {
  try {
    const {
      rows: [platformGames],
    } = await client.query(
      `
        INSERT INTO platform_games ("platformId", "gamesId")
        VALUES ( $1, $2 )
        ON CONFLICT ("platformId", "gamesId")
        RETURNING *
        `,
      [platformId, gamesId]
    );
    return platformGames;
  } catch (error) {
    console.log("Error adding games to platform");
    throw error;
  }
}
// This function updates our platformGames by passing in its id
async function updatePlatformGame({ id }) {
  try {
    const {
      rows: [platformGames],
    } = await client.query(
      `
        UPDATE platform_games
        SET 
        WHERE id=$1
        RETURNING *
        `,
      [id]
    );
    return platformGames;
  } catch (error) {
    throw error;
  }
}
// This function delate a data from our platformGames table
async function destroyPlatformGame(id) {
  try {
    const {
      rows: [platformGames],
    } = await client.query(
      `
        DELETE FROM platform_games
        WHERE id=$1
        RETURNING *
        `,
      [id]
    );
    return platformGames;
  } catch (error) {
    throw error;
  }
}
// This function gets data by it's platformId
async function getPlatformGameByPlatform(id) {
  try {
    const { rows: platformGames } = await client.query(
      `
            SELECT *
            FROM platform_games
            WHERE 'platformId'=$1
            `,
      [id]
    );
    return platformGames;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPlatformGame,
  getAllPlatformGames,
  getPlatformGameById,
  addGameToPlatform,
  updatePlatformGame,
  destroyPlatformGame,
  getPlatformGameByPlatform,
};
