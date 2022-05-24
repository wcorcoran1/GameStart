const express = require("express");
const {
  getGameById,
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
} = require("../db/games");
const { loginAuth } = require("./utils");
const gamesRouter = express.Router();

gamesRouter.get("/", async (req, res, next) => {
  try {
    const games = await getAllGames();
    res.send(games);
  } catch (error) {
    next(error);
  }
});

gamesRouter.get("/:gameId", async (req, res, next) => {
  try {
    const {gameId} = req.params
    const games = await getGameById(gameId);
    res.send(games);
  } catch (error) {
    next(error);
  }
});


gamesRouter.post("/", loginAuth, async (req, res, next) => {
  const { name, description, players, age_rating, cost } = req.body;
  try {
    const games = await createGames({
      name,
      description,
      players,
      age_rating,
      cost,
    });
    res.send(games);
  } catch (error) {
    next(error);
  }
});

gamesRouter.patch("./:gamesId", loginAuth, async (req, res, next) => {
  const { name, description, players, age_rating, cost } = req.body;
  const id = req.params.gamesId;

  try {
    const games = await updateGames({
      id,
      name,
      description,
      players,
      age_rating,
      cost,
    });
    res.send(games);
  } catch (error) {
    next(error);
  }
});

gamesRouter.delete("./:gamesId", loginAuth, async (req, res, next) => {
  const id = req.params.platformId;

  try {
    const games = await deleteGame({ id });
    res.send(games);
  } catch (error) {
    next(error);
  }
});

module.exports = gamesRouter;
