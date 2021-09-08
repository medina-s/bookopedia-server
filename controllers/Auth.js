let express = require('express')
let router = express.Router()
const { User } = require('../models')

router.post("/create/:name", async (req, res) => {
    let message 
    console.log(User)
    try {
        const user = await User.create({
            username: req.params.name
        })
        message = {
            msg:'User Created', 
            user
        }
    } catch (err){
        console.log(err)
        message = {
            msg:'Failed to Create User'
        }
    }
    res.json(message)
})

module.exports = router