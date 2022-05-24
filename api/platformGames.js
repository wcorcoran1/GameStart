const express = require("express");
const { getPlatformById } = require("../db/platform");
const {
  getPlatformGameById,
  addGameToPlatform,
  updatePlatformGame,
  destroyPlatformGame,
  getPlatformGameByPlatform,
} = require("../db/platformGames");
const { loginAuth } = require("./utils");
const platformGamesRouter = express.Router();

platformGamesRouter.use((req, res, next) => {
  console.log("A request is being made to /platformGames");
  next();
});

platformGamesRouter.get("/", async (req, res, next) => {
  loginAuth;
  const id = req.params.platformGamesId;
  try {
    const prevPlatform = await getPlatformGameById(id);
    const nextPlatform = await getPlatformById(prevPlatform.platformId);
    if (req.platform.id != nextPlatform.platformGamesId) {
      res.status(500).send(err);
    }
    const platformGame = await getPlatformGameByPlatform(id);
    res.send({
      platformGame,
    });
  } catch (error) {
    next(error);
  }
});

platformGamesRouter.patch(
  "/:platformGamesId/",
  loginAuth,
  async (req, res, next) => {
    const id = req.params.platformGamesId;
    try {
      const prevPlatform = await getPlatformGameById(id);
      const nextPlatform = await getPlatformById(prevPlatform.platformId);
      if (req.user.id != nextPlatform.creatorId) {
        res.status(500).send(err);
      } else {
        const platformGame = await updatePlatformGame({ id });
        res.send(platformGame);
      }
    } catch (error) {
      next(error);
    }
  }
);

platformGamesRouter.post(
  "/:platformGamesId/",
  loginAuth,
  async (req, res, next) => {
    const id = req.params.platformGamesId;
    try {
      const prevPlatform = await getPlatformGameById(id);
      const nextPlatform = await getPlatformById(prevPlatform.platformId);
      if (req.user.id != nextPlatform.creatorId) {
        res.status(500).send(err);
      }
      const platformGame = await addGameToPlatform(id);
      res.send(platformGame);
    } catch (error) {
      next(error);
    }
  }
);

platformGamesRouter.delete(
  "/:platformGamesId",
  loginAuth,
  async (req, res, next) => {
    const id = req.params.platformGamesId;
    try {
      const prevPlatform = await getPlatformGameById(id);
      const nextPlatform = await getPlatformById(prevPlatform.platformId);
      if (req.user.id != nextPlatform.creatorId) {
        res.status(500).send(err);
      }
      const platformGame = await destroyPlatformGame(id);
      res.send(platformGame);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = platformGamesRouter;
