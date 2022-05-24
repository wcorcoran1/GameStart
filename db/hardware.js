// This is our hardware database functions 
const client = require("./client");
// This function creates new data for our hardware table
async function createHardware({ model, description, cost }) {
  try {
    const {
      rows: [hardware],
    } = await client.query(
      `
              INSERT INTO hardware (model, description, cost)
              VALUES ($1, $2, $3)
              RETURNING *
              `,
      [model, description, cost]
    );
    return hardware;
  } catch (error) {
    throw error;
  }
}
// This function gets all the data from the hardware table database
async function getAllHardware() {
  try {
    const { rows } = await client.query(
      `
                SELECT *
                FROM hardware
                `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
// This function gets hardware data by it's id 
async function getHardwareById(id) {
  try {
    const {
      rows: [hardware],
    } = await client.query(
      `
        SELECT **
        FROM hardware
        WHERE id = $1
        `,
      [id]
    );
    return hardware;
  } catch (error) {
    throw error;
  }
}
// This function lets us update data from the hardware table based on its id num. 
async function updateHardware({ id, model, description, cost }) {
  try {
    const {
      rows: [hardware],
    } = await client.query(
      `
            UPDATE hardware
            SET model = $2, brand = $3, cost = $4
            WHERE id = $1
            RETURNING *
            `,
      [id, model, description, cost]
    );
    return hardware;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createHardware,
  getAllHardware,
  getHardwareById,
  updateHardware,
};
