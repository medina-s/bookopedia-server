let express = require('express')
let router = express.Router()
const { User, Review } = require('../models')

router.post("/create/:userid", async (req, res) => {
    let message 
    console.log(User)
    try{
        let u = await User.findOne({ where: { id: req.params.userid } })
        if (u) {
            let review = await Review.create({ booktitle: req.body.review.booktitle,
                bookauthor: req.body.review.bookauthor,
                reviewtext: req.body.review.reviewtext,
                rating: req.body.review.rating
                })
            await u.addReview(review)

            let { id, booktitle, bookauthor, reviewtext, rating } = await Review.findOne({ where: { id: review.id } })
            console.log(review.id)
            message = { message: "Post made!", data: { id, booktitle, bookauthor, reviewtext, rating }}    
        }
        else {
            message = { message: "Can't make a post, user does not exist", data: null }
        }

    } catch(err) {
        message = { message: "Post Create Failed" }
        console.log(err)
    }
    res.json(message)
})

router.get("/user/:userid/all/", async(req, res) => {
    let u = await User.findOne({ where: { id: req.params.userid }})
    let reviews = u ? await u.getReviews() : null
    if (reviews){
        let all_reviews = reviews.map( r => {
                    const { id, booktitle, bookauthor, reviewtext, rating } = r
                    return { id, booktitle, bookauthor, reviewtext, rating }
        })

        res.send(all_reviews)
    }
    else
        res.send(reviews)
})

router.get("/user/:userid/review/:reviewid", async(req, res) => {
    try{
    let u = await Review.findOne({ where: { id: req.params.reviewid , UserId: req.params.userid}})
    //let reviews = u ? await u.getReviews() : null

    if (u != null){
        let { id, booktitle, bookauthor, reviewtext, rating, UserId } = u
        review = { message: "Review found!", data: { id, booktitle, bookauthor, reviewtext, rating, UserId }}  
        res.send(review)
    }
    else{
        message = {message: "No reviews found for the given user id and review id."}
        res.send(message)
    }
}catch(err){
    console.log(err)
    message = {message: "Error with your query. Check User and Review ID."}
    res.send(message)
}
})

router.get("/all/:booktitle/:bookauthor", async(req, res) => {
    try{

    let u = await Review.findAll({ where: { booktitle: req.params.booktitle, bookauthor: req.params.bookauthor }})
    console.log(u)
    
    //let reviews = u ? await u.getReviews() : null
    if (u.length != 0){
        let all_reviews = u.map( r => {
                    const { id, booktitle, bookauthor, reviewtext, rating, UserId } = r
                    return { id, booktitle, bookauthor, reviewtext, rating, UserId }
        })
    //all_reviews = { message: "All Reviews!", data: { id, booktitle, bookauthor, reviewtext, rating, userid }} 
    //all_reviews = {booktitle: req.params.booktitle, bookauthor: req.params.bookauthor}
    res.send(all_reviews)
    }
    else{
        message = {message: "No reviews found for the given book and author."}
        res.send(message)}
}catch(err){
    console.log(err)
}
})

router.put("/user/:userid/edit/:reviewid/", async (req, res) => {
    let message 
    console.log(User)
    try{
        let u = await User.findOne({ where: { id: req.params.userid } })
        if (u) {
            let review = await Review.update({ booktitle: req.body.review.booktitle,
                bookauthor: req.body.review.bookauthor,
                reviewtext: req.body.review.reviewtext,
                rating: req.body.review.rating
                }, {where: {UserId: req.params.userid, id: req.params.reviewid}})
            //await u.addReview(review)

            let { id, booktitle, bookauthor, reviewtext, rating } = await Review.findOne({ where: { id: req.params.reviewid } })
            //console.log("+++++++++++++++++")
            //console.log(review)
            message = { message: "Review updated!", data: { id, booktitle, bookauthor, reviewtext, rating }}    
        }
        else {
            message = { message: "Can't update review, user does not exist", data: null }
        }

    } catch(err) {
        message = { message: "Review Update Failed"}
        console.log(err)
    }
    res.json(message)
})

router.delete("/user/:userid/delete/:reviewid/", async (req, res) => {
    let message 
    console.log(User)
    try{
        let u = await User.findOne({ where: { id: req.params.userid } })
        if (u) {
            let review = await Review.destroy({where: {UserId: req.params.userid, id: req.params.reviewid}})
            //await u.addReview(review)

            //let { id, booktitle, bookauthor, reviewtext, rating } = await Review.findOne({ where: { id: req.params.reviewid } })
            //console.log("+++++++++++++++++")
            //console.log(review)
            message = { message: "Review deleted!"}    
        }
        else {
            message = { message: "Can't update review, user does not exist", data: null }
        }

    } catch(err) {
        message = { message: "Review Update Failed"}
        console.log(err)
    }
    res.json(message)
})

module.exports = router