//this is our router structure
/* 
in the url api will have been used
*/
const express = require('express')
const apiRouter = express.Router();

const userRouter = require("./user")
const cartRouter = require("./cart")
const gamesRouter = require("./games")
const hardwareRouter = require("./hardware")
const platformRouter = require("./platform")
const platformGamesRouter = require("./platformGames")
const platformHardwareRouter = require("./platformHardware")
const jwt = require("jsonwebtoken")
const { getUserById } = require("../db");
const { JWT_SECRET } = process.env;

apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

apiRouter.use("/user", userRouter);
apiRouter.use("/games", gamesRouter)
apiRouter.use("/hardware", hardwareRouter)
apiRouter.use("/platform", platformRouter);
apiRouter.use("/platformGames", platformGamesRouter);
apiRouter.use("/platformHardware", platformHardwareRouter);

// set `req.user` if possible
apiRouter.use(async (req, res, next) => {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");

    if (!auth) {

        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: "AuthorizationHeaderError",
            message: `Authorization token must start with ${prefix}`,
        });
    }
});

apiRouter.use((req, res, next) => {
    if (req.user) {
        console.log("User is set:", req.user);
    }

    next();
});

// requires login to checkout

apiRouter.use("/cart", cartRouter)

apiRouter.use((error, req, res, next) => {
  res.send({
      name: error.name,
      message: error.message,
  });
});



module.exports = apiRouter;
