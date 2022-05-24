// This where our functions for our platform-hardware database.
const client = require("./client");
// This function creates new platform-hardwares by inserting into our database table.
async function createPlatformHardware({ platformId, hardwareId }) {
  try {
    const {
      rows: [platformHardware],
    } = await client.query(
      `
          INSERT INTO platform_hardware ("platformId", "hardwareId") 
          VALUES ($1, $2)
          RETURNING *;
          `,
      [platformId, hardwareId]
    );
    return platformHardware;
  } catch (error) {
    throw error;
  }
}
// This function gets all the data in our platform-hardware table
async function getAllPlatformHardware() {
  try {
    const { rows: platform_hardware } = await client.query(`
              SELECT *
              FROM platform_hardware;
            `);

    return platform_hardware;
  } catch (error) {
    throw error;
  }
}
// This function gets platform-hardware by its Id.
async function getPlatformHardwareById(id) {
  try {
    const {
      rows: [platformHardware],
    } = await client.query(
      `
          SELECT *
          FROM platform_hardware;
          WHERE id=${id}
          `
    );
    return platformHardware;
  } catch (error) {
    throw error;
  }
}
// This function updates our platform-hardware by id
async function updatePlatformHardware({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [platformHardware],
    } = await client.query(
      `
              UPDATE platform_hardware
              SET ${setString}
              WHERE id=${id}
              RETURNING *
          `,
      Object.values(fields)
    );
    return platformHardware;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPlatformHardware,
  getAllPlatformHardware,
  getPlatformHardwareById,
  updatePlatformHardware,
};
