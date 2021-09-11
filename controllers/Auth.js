let express = require('express')
let router = express.Router()
const { User } = require('../models')
const jwt = require("jsonwebtoken")

router.post("/register/", async (req, res) => {
    let message 
    console.log(User)
    try {
        const user = await User.create({
            username: req.body.user.username,
            password: req.body.user.password,
            firstname: req.body.user.firstname,
            lastname: req.body.user.lastname,
            email: req.body.user.email,
            role: "general"
        })

        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 6*60*24});

        message = {
            msg:'User Registered', 
            user: user,
            sessionToken: token
        }
    } catch (err){
        //console.log(err)
        console.log(req.body)
        message = {
            msg:'Failed to Create User'
        }
    }
    res.json(message)
})

router.post("/login/", async (req, res) => {
    let {email, password} = req.body.user;

    try{
        const loginUser = await User.findOne({
            where: {
                email: email,
            },
        });

        if (loginUser){

            let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 6*60*24});

            res.status(200).json({
                user: loginUser,
                message: "User successfully logged in!",
                sessionToken: token
            });
        } else{
            res.status(401).json({
                message: "Login Failed!"
            });
        }
    } catch (err){
        res.status(500).json({
            message: "Falied to log in user!"
        })
    }
    
})

module.exports = router