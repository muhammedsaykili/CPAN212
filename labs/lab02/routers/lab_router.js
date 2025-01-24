import express from "express";
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("Welcome to the lab router")
})

// /name -> /lab/name
router.get("/name", (req, res)=>{
    res.send("My name is Muhammed Saykili")
})

// /greeting -> /lab/greeting
router.get("/greeting", (req, res)=>{
    res.send("hello, my name is Muhammed Saykili and my student number is n01486427")
})

router.get("/add/:x/:y", (req, res)=>{
    let x = parseFloat(req.params.x);
    let y = parseFloat(req.params.y);

    res.send (`${x+y}`)
})

router.get("/calculate/:a/:b/:operation", (req, res) => {
    let a = parseFloat(req.params.a)
    let b = parseFloat(req.params.b)
    switch (req.params.operation) {
        case "+":
            res.send(`${a+b}`)
            break;
            
        case "-":
            res.send(`${a-b}`)
            break;

        case "*":
            res.send(`${a*b}`)
            break;

        case "/":
            res.send(`${a / b}`)
            break;
    
        default:
            res.send("WRONG OPERATION")
            break;
    }

})

export default router;