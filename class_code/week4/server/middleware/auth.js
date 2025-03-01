const auth = (req, res, next) => {
    if(req.query.username === "Harman"){
    next()
    } else {
        res.send("Access not allowed")
        res.redirect("http://localhost:800/")
        res.json({message: "You are not the right user"})

    }
  } 

export default auth