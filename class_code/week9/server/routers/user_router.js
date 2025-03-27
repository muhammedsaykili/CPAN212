import express from "express";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", (req, res)=>{
    const {email, password} = req.body
    bcrypt.hash(password, 10)
    .then((hashedPassword)=>{
        let newUser = new User({
            email,
            password: hashedPassword
        });

        newUser.save()

        User.findOne({email: email})
        .then(()=>{
            res.json({message: "account registered"})
        })
        .catch((err))
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({message: "email already in use"})
    })
})

export default router;

