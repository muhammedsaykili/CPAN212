/* Project setup: For the server
1 - new project folder
2 - open an integrated terminal
3 - run these commands:
    npm init -y
    npm i express nodemon
    (optional) -> go into package.json and add "type": "module" to enable import from 
*/
 
// [Please enable only ONE of these] 
// import express from "express"; // if you are using type: module
import express from "express"
import logger from "./middleware/logger.js"
import auth from "./middleware/auth.js";

const app = express();
const PORT = process.env.PORT || 8000;

// middlelware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger) // app wide

// routes
app.get("/", logger , (req, res) => {
  res.send("Welcome to your");
});

app.get("/profile", auth , (req, res) => {
    res.send("Welcome to your ptofile page");
  });

app.get("/01", (req, res) => {
    logger (req)
    res.send("Welcome to our server - 01");
})

app.get("/02", (req, res) => {
    logger (req)
    res.send("Welcome to our server - 02");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
 