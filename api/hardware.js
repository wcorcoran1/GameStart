const express = require("express");
const {
  getAllHardware,
  createHardware,
  updateHardware,
} = require("../db/hardware");
const { loginAuth } = require("./utils");
const hardwareRouter = express.Router();

hardwareRouter.get("/", async (req, res, next) => {
  try {
    const hardware = await getAllHardware();
    res.send(hardware);
  } catch (error) {
    next(error);
  }
});

hardwareRouter.post("/", loginAuth, async (req, res, next) => {
  const { name, description } = req.body;
  try {
    const hardware = await createHardware({ name, description });
    res.send(hardware);
  } catch (error) {
    next(error);
  }
});

hardwareRouter.patch("./hardwareId", loginAuth, async (req, res, next) => {
  const { name, description } = req.body;
  const id = req.params.hardwareId;

  try {
    const hardware = await updateHardware({ id, name, description });
    res.send(hardware);
  } catch (error) {
    next(error);
  }
});

module.exports = hardwareRouter;
