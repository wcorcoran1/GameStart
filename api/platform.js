// This is the Platforms API that we will use to make routes from backend to frontend
const express = require("express");
const {
  getPlatformById,
  getAllPlatforms,
  createPlatform,
  updatePlatform,
  deletePlatform
} = require("../db/platform");
const { loginAuth } = require("./utils");
const platformRouter = express.Router();
// This is a get route set up to get all the platforms from the database. 
platformRouter.get("/", async (req, res, next) => {
  try {
    const platform = await getAllPlatforms();
    res.send(platform);
  } catch (error) {
    next(error);
  }
});
// This an API post route lets us make a new platform
platformRouter.post("/", loginAuth, async (req, res, next) => {
  const { name } = req.body;
  try {
    const platform = await createPlatform({ name });
    res.send(platform);
  } catch (error) {
    next(error);
  }
});
// This is an API patch route that lets update an existing platform based on its id
platformRouter.patch("./:platformId", loginAuth, async (req, res, next) => {
  const { name} = req.body;
  const id = req.params.platformId;

  try {
    const platform = await updatePlatform({ id, name });
    res.send(platform);
  } catch (error) {
    next(error);
  }
});
// This a delete route that lets delete a platform based on its id.
platformRouter.delete("./:platformId", loginAuth, async (req, res, next) => {
  const { name, description } = req.body;
  const id = req.params.platformId;

  try {
    const platform = await deletePlatform({ id, name });
    res.send(platform);
  } catch (error) {
    next(error);
  }
});

module.exports = platformRouter