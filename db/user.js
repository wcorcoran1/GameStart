// This is our user database functions 

const client = require("./client");
// this function creates a user by inserting into our users table
async function createUser({ name, email, username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
INSERT INTO users(name, email, username, password)
VALUES($1, $2, $3, $4)
ON CONFLICT (username) DO NOTHING
RETURNING *
`,
      [name, email, username, password]
    );
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

/* this adapter should fetch a list of users from your db */
async function getAllUsers() {
  try {
    const {
      rows: [user],
    } = await client.query(`
    SELECT id, name, email, username, password
    FROM users
`);
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}
// this function gets users by their user's id that they were assigned when they were created
async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
SELECT * FROM users
WHERE id=$1
`,
      [id]
    );
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw error;
  }
}
/* This function get user by their username and if that user 
doesn't have a username it returns null*/
async function getUserByUsername(username) {
  try {
    const {
      rows: [user]
    } = await client.query(
      `
  SELECT * FROM users
  WHERE username = $1
  `,
      [username]
    );
    if (!user) {
      return null;
    }
// console.log("user!!!",user)
    return user;
  } catch (error) {
    console.error(error)
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
};
