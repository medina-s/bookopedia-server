let express = require('express')
let router = express.Router()

router.get("/", async(req, res) => {
    var response = "Bookopedia Web App Index"

        res.send(response)
    
    
})

module.exports = router