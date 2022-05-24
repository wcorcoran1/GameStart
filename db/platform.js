// This is our functions for Platform database that we will use in Seed and API 
const client = require("./client");
const { attachGamesToPlatforms } = require("./games")
// This function creates new data for platform database
const createPlatform = async ({ name }) => {
  try {
    const {
      rows: [names],
    } = await client.query(
      `
        INSERT INTO platform (name)
        VALUES ($1)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
        `,
      [name]
    );
    return names;
  } catch (error) {
    throw error;
  }
};
// this function gets all data from the platform database
const getAllPlatforms = async () => {
  try {
    const { rows } = await client.query(`
    SELECT *
    FROM platform;
    `);
    const result = await attachGamesToPlatforms(rows)
     return result
  } catch (error) {
    throw error;
  }
};
// This function gets platforms by their ids from the database
const getPlatformById = async (id) => {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
              SELECT * FROM platform
              WHERE id=$1;
          `,
      [id]
    );

    return activity;
  } catch (error) {
    throw error;
  }
};
// This function updates a platform's database based on its id
async function updatePlatform({ id, name }) {
  try {
    const {
      rows: [platform],
    } = await client.query(
      `
            UPDATE platform
            SET name = $2 
            WHERE id = $1
            RETURNING *
            `,
      [id, name]
    );
    return platform;
  } catch (error) {
    throw error;
  }
}
// This function deletes a platform in the database based on its id
async function deletePlatform({ id }) {
  try {
    const {
      rows: [platform],
    } = await client.query(
      `
    DELETE FROM platform
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    return platform;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPlatform,
  getAllPlatforms,
  getPlatformById,
  updatePlatform,
  deletePlatform,
};
