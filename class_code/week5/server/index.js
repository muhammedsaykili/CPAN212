import express from "express"
import cors from "cors"
import multer from "multer"

const app = express();
const PORT = process.env.PORT || 8000;
 
// middlelware
app.use(cors())
app.use(express.urlencided({extended:true}))
app.use(express.json())
 
// routes
app.get("/", (req, res) => {
  res.send("Welcome to our server");
});

app.get("/data", (req, res) => {
    res.json({
        name: "harman",
        password: "password123",
        username: "harmanmann"
    })
  });

app.post("/login", (res, req)=>{
    console.log(req.body);
    res.json("I got your information")
})
 
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 
app.use("", (req, res) => {
  res.status(404).send("Page not found");
});
 

npm i multer