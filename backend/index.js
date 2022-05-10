const { db } = require("./db");
const PORT = process.env.PORT || 1337;
const app = require("./app");
const seed = require("../seed");

const init = async () => {
  try {
    await seed();
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();