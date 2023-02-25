const dotenv = require("dotenv")
dotenv.config();
module.exports = {
PORT: process.env.PORT,
API_KEY: process.env.API_KEY,
MAPKEY: process.env.MAPKEY
}
