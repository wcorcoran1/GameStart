// This is where we made the initial data for database
const client = require("./client");
const { createUser } = require("./user");
const { createCart } = require("./cart");
const { createGame } = require("./games");
const { createHardware } = require("./hardware.js");
const { createPlatform, getAllPlatforms } = require("./platform");
const { createPlatformHardware } = require("./platformHardware");
const {
  createPlatformGame,
  getAllPlatformGames,
  getPlatformGameByPlatform,
  getPlatformGameById,
} = require("./platformGames");
// This is our build table function builds and drops our database tables
async function buildTables() {
  try {
    console.log("----Dropping tables----");
    await client.query(`
    DROP TABLE IF EXISTS cart;
    DROP TABLE IF EXISTS platform_hardware;
    DROP TABLE IF EXISTS platform_games;
    DROP TABLE IF EXISTS platform;
    DROP TABLE IF EXISTS hardware;
    DROP TABLE IF EXISTS games;
    DROP TABLE IF EXISTS users;
    `);
    // drop tables in correct order
    console.log("----Tables dropped----");
    console.log("----Building tables----");
    // build tables in correct order
    //(will need to change users table password to not be stored in db but in cookie)
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL 
    );
    CREATE TABLE games (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      players VARCHAR(255) NOT NULL,
      age_rating VARCHAR(255),
      cost VARCHAR(255)
    );
    CREATE TABLE hardware (
      id SERIAL PRIMARY KEY,
      model TEXT NOT NULL,
      description TEXT NOT NULL,
      cost INTEGER
    );
    CREATE TABLE platform (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE platform_games (
      id SERIAL PRIMARY KEY,
      "platformId" INTEGER REFERENCES platform(id),
      "gamesId" INTEGER REFERENCES games(id)
    );
    CREATE TABLE platform_hardware (
      id SERIAL PRIMARY KEY,
      "platformId" INTEGER REFERENCES platform(id),
      "hardwareId" INTEGER REFERENCES hardware(id)
    );
    CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      "usersId" INTEGER REFERENCES users(id),
      "gamesId" INTEGER REFERENCES games(id),
      "hardwareId" INTEGER REFERENCES hardware(id),
      quantity INTEGER,
      total_cost VARCHAR(255)
    );
    `);
    console.log("----Tables built----");
  } catch (error) {
    throw error;
  }
}
// this is our starting data for platform games that connects platforms to games through Ids
async function createInitialPlatform_Games() {
  try {
    console.log("starting to create platform_Games...");

    const platform_game = [
      { platformId: 1, gamesId: 1 },
      { platformId: 2, gamesId: 2 },
      { platformId: 3, gamesId: 3 },
      { platformId: 4, gamesId: 4 },
      { platformId: 2, gamesId: 9 },
      { platformId: 3, gamesId: 8 },
      { platformId: 1, gamesId: 10 },
    ];

    const platformGames = await Promise.all(
      platform_game.map((platformGame) => createPlatformGame(platformGame))
    );
    console.log(platformGames);
    console.log("----Finished creating platform games----");
  } catch (error) {
    console.log("----Error building platform games----");
    throw error;
  }
}
// This is our starting data for our games database
async function createInitialGames() {
  try {
    console.log("starting to create Games...");

    const gamesToCreate = [
      {
        gamesId: 2,
        name: "Skull",
        description: "The Hero Slayer",
        players: "Single Player",
        age_rating: "T",
        cost: "34.99",
      },
      {
        gamesId: 1,
        name: "Epic Chef",
        description: "Get ready to embark on a culinary journey!",
        players: "Single Player",
        age_rating: "E",
        cost: "39.99",
      },
      {
        gamesId: 2,
        name: "Tiny Tina's Wonderlands",
        description: "Borderlands!",
        players: "Multiplayer",
        age_rating: "T",
        cost: "69.99",
      },
      {
        gamesId: 1,
        name: "Kirby and the Forgotten Land",
        description: "Join Kirby in an unforgettable journey!",
        players: "Single Player",
        age_rating: "E",
        cost: "59.99",
      },
      {
        gamesId: 2,
        name: "13 Sentinels",
        description: "Aegis Rim",
        players: "Single Player",
        age_rating: "T",
        cost: "59.99",
      },
      {
        gamesId: 3,
        name: "Grand Theft Auto V",
        description:
          "Go To College. Then You Can Rip People Off And Get Paid For It. It's Called Capitalism",
        players: "Multiplayer",
        age_rating: "M",
        cost: "39.99",
      },
      {
        gamesId: 3,
        name: "Tormented Souls",
        description: "Classic Survival Horror.",
        players: "Single Player",
        age_rating: "M",
        cost: "39.99",
      },
      {
        gamesId: 3,
        name: "Red Dead Redemption II",
        description:
          "Epic tale of outlaw Arthur Morgan and the infamous Van der Linde gang.",
        players: "Multiplayer",
        age_rating: "M",
        cost: "29.99",
      },
      {
        gamesId: 3,
        name: "Olden Ring",
        description: "Just like another Dark Soul game.",
        players: "Single Player",
        age_rating: "M",
        cost: "59.99",
      },
      {
        gamesId: 1,
        name: "Sid Meier's Civilization VI",
        description: "Platinum Edition",
        players: "Single Player",
        age_rating: "E",
        cost: "14.99",
      },
    ];
    const games = await Promise.all(
      gamesToCreate.map((game) => createGame(game))
    );
    console.log("Games Created: ", games);
    console.log("Finished creating games.");
  } catch (error) {
    console.log("error creating games", error);
  }
}
// This is our platforms data that is being made for our platforms table 
const createInitialPlatforms = async () => {
  console.log("----Starting to create platforms----");
  try {
    const platformsToCreate = [
      { name: "PC" },
      { name: "Playstation" },
      { name: "Xbox" },
      { name: "Switch" },
    ];

    const platforms = await Promise.all(
      platformsToCreate.map((platform) => {
        return createPlatform(platform);
      })
    );
    console.log(platforms);

    console.log("----Finished creating platforms----");
  } catch (error) {
    console.log("----Error creating platforms----");
    throw error;
  }
};
// this is our starting data for our hardware database table
const createInitialHardware = async () => {
  console.log("----Starting to create Hardware----");
  try {
    const hardwareToCreate = [
      {
        model: "Keyboards",
        description:
          "The newest keyboards on the market, they are waterproof and everything! Comes with a two year warranty only here at the Bee Keeper",
        cost: "30",
      },
      {
        model: "Mouses",
        description: "All the best mouses for gaming on the market",
        cost: "10",
      },
      {
        model: "Headphones",
        description:
          "Best headphones with surround sound system, for every console available",
        cost: "20",
      },
      {
        model: "Microphones",
        description:
          "Microphones for everyone who is trying to get into making podcasts for gaming, blogging and more!",
        cost: "35",
      },
      {
        model: "Mouse-pads",
        description:
          "The thinnest mouse-pads available only here on the Bee Keeper! The sleekest designs.",
        cost: "10",
      },
      {
        model: "Gaming chairs",
        description:
          "The ultimate chairs for you gamers that are sitting down for 10 hours plus! Got any chair to meet your comfort level",
        cost: "50",
      },
      {
        model: "Monitors",
        description:
          "The best monitors around, from the best brands all around the market. From Samsung to LG, get your monitors for discounts!",
        cost: "200",
      },
    ];
    const hardwares = await Promise.all(
      hardwareToCreate.map((hardware) => createHardware(hardware))
    );
    console.log("hardware created: ", hardwares);
    console.log("Finished creating the hardware");
    return hardwares;
  } catch (error) {
    console.log("Error creating hardware!");
    throw error;
  }
};
// This table makes data that connects our platforms to hardware table by their Ids
async function createInitialPlatform_Hardware() {
  try {
    console.log("starting to create platform_hardware...");

    const hardwareToCreate = [
      { platformId: 1, hardwareId: 1 },
      { platformId: 2, hardwareId: 2 },
      { platformId: 3, hardwareId: 3 },
      { platformId: 4, hardwareId: 4 },
    ];
    const pHardware = await Promise.all(
      hardwareToCreate.map((hardware) => createPlatformHardware(hardware))
    );
    console.log("Routines Created: ", pHardware);
    console.log("Finished creating routines.");
  } catch (error) {
    throw error;
  }
}
// This makes our starting users for our database 
// This data was made before we started using hash passwords
async function createInitialUsers() {
  console.log("starting to create users...");
  try {
    const usersToCreate = [
      {
        name: "Ash",
        email: "ash24@pokemonmail.com",
        username: "Ash",
        password: "pokemon123",
      },
      {
        name: "BruceWayne",
        email: "Bwyane@waynemail.com",
        username: "Batman",
        password: "iambatman$",
      },
      {
        name: "MasterChief",
        email: "masterchief@Halo.com",
        username: "Chief",
        password: "masterchief1",
      },
      {
        name: "DarthVader",
        email: "Lordvader@empiremail.com",
        username: "Vader",
        password: "empirerules",
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("error creating users!");
    throw error;
  }
}
// This is starting data for our carts database
async function createInitialCarts() {
  console.log("starting to create Carts...");
  try {
    const initialCart = [
      {
        usersId: 1,
        gamesId: 1,
        hardwareId: 2,
        quantity: 34,
        total_cost: "49.99"
      },
      {
        usersId: 2,
        gamesId: 2,
        hardwareId: 2,
        quantity: 44,
        total_cost: "29.99"
      },
      {
        usersId: 3,
        gamesId: 3,
        hardwareId: 3,
        quantity: 74,
        total_cost: "19.98"
      },
      {
        usersId: 4,
        gamesId: 4,
        hardwareId: 4,
        quantity: 94,
        total_cost: "39.99"
      },
    ];
    console.log(initialCart)
    const cart = await Promise.all(
      initialCart.map((cartItem) => createCart(cartItem))
    );

    console.log("Carts created:");
    console.log(cart);
    console.log("Finished creating Carts!");
  } catch (error) {
    console.error("error creating Carts!");
    throw error;
  }
}
async function testDb(){
  try{
console.log("calling all platformGames!!")
const allPlatformGames = await getAllPlatformGames()
console.log("ALlPlatformGames", allPlatformGames)
console.log("Calling All Platforms with their games ")
const platformId = await getAllPlatforms()
console.log("AllPlatforms",platformId)
console.log("Calling getPlatformGame platform")
const gameByPlatform = await getPlatformGameByPlatform(3)
console.log("game by Platform",gameByPlatform)
  }catch(error){
console.error("error on testing db")
throw error
  }
}

async function populateInitialData() {
  try {
    client.connect();
    await buildTables();
    await createInitialPlatforms();
    await createInitialGames();
    await createInitialHardware();
    await createInitialPlatform_Games();
    await createInitialPlatform_Hardware();
    await createInitialUsers();
    await createInitialCarts();
    
    await testDb();
  } catch (error) {
    throw error;
  }
}

populateInitialData()
  .catch(console.error)
  .finally(() => client.end());
