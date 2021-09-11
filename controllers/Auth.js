let express = require('express')
let router = express.Router()
const { User } = require('../models')


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
        message = {
            msg:'User Registered', 
            user
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
            res.status(200).json({
                user: loginUser,
                message: "User successfully logged in!"
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