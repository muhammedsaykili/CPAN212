import express from "express"
import lab_router from "./routers/lab_router.js"

const app = express();
const PORT = process.env.PORT || 8000;

app.use("/lab", lab_router);
// If I run localhost:8000/lab

app.get("/", (req, res)=>{
    res.send("Welcome to the Server")
})

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})


