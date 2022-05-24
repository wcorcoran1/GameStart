const client = require("./client");
// This where we are exporting all of our functions to be used in the API and seedData
module.exports = {
  ...require("./hardware"),
  ...require("./platformHardware"),
  ...require("./platformGames"),
  ...require("./cart"),
  ...require("./games"),
  ...require("./platform"),
  ...require("./user"),
  client
};
