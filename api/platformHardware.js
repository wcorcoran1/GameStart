const express = require("express");
const { getPlatformById } = require("../db/platform");
const {
  createPlatformHardware,
  getAllPlatformHardware,
  getPlatformHardwareById,
  updatePlatformHardware,
} = require("../db/platformHardware");
const { loginAuth } = require("./utils");
const platformHardwareRouter = express.Router();

platformHardwareRouter.patch(
  "/:platformHardwareId/",
  loginAuth,
  async (req, res, next) => {
    const { count, duration } = req.body;
    const id = req.params.platformHardwareId;
    try {
      const prevPlatform = await getPlatformHardwareById(id);
      const nextPlatform = await getPlatformById(prevPlatform.platformId);
      if (req.user.id != nextPlatform.creatorId) {
        res.status(500).send(err);
      } else {
        const platformHardware = await updatePlatformHardware({
          id,
          count,
          duration,
        });
        res.send(platformHardware);
      }
    } catch (error) {
      next(error);
    }
  }
);

platformHardwareRouter.post(
  "/:platformHardwareId/",
  loginAuth,
  async (req, res, next) => {
    const id = req.params.platformHardwareId;
    try {
      const prevPlatform = await getPlatformHardwareById(id);
      const nextPlatform = await getPlatformById(prevPlatform.platformId);
      if (req.user.id != nextPlatform.creatorId) {
        res.status(500).send(err);
      }
      const platformHardware = await createPlatformHardware(id);
      res.send(platformHardware);
    } catch (error) {
      next(error);
    }
  }
);

platformHardwareRouter.get("/:platformHardware/", async (req, res, next) => {
  const id = req.params.platformHardware;
  try {
    const prevPlatform = await getPlatformHardwareById(id);
    const nextPlatform = await getPlatformById(prevPlatform.platformId);
    if (req.user.id != nextPlatform.creatorId) {
      res.status(500).send(err);
    }
    const platformHardware = await getAllPlatformHardware(id);
    res.send(platformHardware);
  } catch (error) {
    next(error);
  }
});

module.exports = platformHardwareRouter;
