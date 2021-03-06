const e = require("express");
let express = require("express");
let router = express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { User, ReadingList } = require("../models");

router.post("/create", validateJWT, async (req, res) => {
  let message;
  console.log(User);
  try {
    let u = req.user;
    let v = await ReadingList.findOne({
      where: {
        UserId: u.id,
        booktitle: req.body.rlist.booktitle,
        bookauthor: req.body.rlist.bookauthor,
      },
    });
    if (v === null && u) {
      let readinglist = await ReadingList.create({
        booktitle: req.body.rlist.booktitle,
        bookauthor: req.body.rlist.bookauthor,
        status: req.body.rlist.status,
      });
      await u.addReadingList(readinglist);

      let { id, booktitle, bookauthor, status } = await ReadingList.findOne({
        where: { id: readinglist.id },
      });
      console.log(readinglist.id);
      message = {
        message: "Reading List Item made!",
        data: { id, booktitle, bookauthor, status },
      };
    } else {
      message = { message: "Can't add item to reading list.", data: null };
    }
  } catch (err) {
    message = { message: "Reading List Item Create Failed" };
    console.log(err);
  }
  res.json(message);
});

router.get("/all", validateJWT, async (req, res) => {
  let u = req.user; // await User.findOne({ where: { id: req.params.userid}})
  let readinglist = u ? await u.getReadingLists() : null;
  if (readinglist) {
    let all_readinglist = readinglist.map((r) => {
      const { id, booktitle, bookauthor, status } = r;
      return { id, booktitle, bookauthor, status };
    });

    res.send(all_readinglist);
  } else res.send(readinglist);
});

router.get("/r/:rlistid", validateJWT, async (req, res) => {
  try {
    let u = await ReadingList.findOne({
      where: { id: req.params.rlistid, UserId: req.user.id },
    });
    //let reviews = u ? await u.getReviews() : null

    if (u != null) {
      let { id, booktitle, bookauthor, status, UserId } = u;
      rlist = {
        message: "Reading List item found!",
        data: { id, booktitle, bookauthor, status, UserId },
      };
      res.send(rlist);
    } else {
      message = {
        message: "No items found for the given user id and reading list id.",
      };
      res.send(message);
    }
  } catch (err) {
    console.log(err);
    message = {
      message: "Error with your query. Check User and Reading List ID.",
    };
    res.send(message);
  }
});

router.put("/edit/:rlistid", validateJWT, async (req, res) => {
  let message;
  console.log(User);
  let rlist;
  try {
    let u = req.user; // await User.findOne({ where: { id: req.params.userid } })
    if (u) {
      rlist = await ReadingList.update(
        {
          booktitle: req.body.rlist.booktitle,
          bookauthor: req.body.rlist.bookauthor,
          status: req.body.rlist.status,
        },
        { where: { UserId: u.id, id: req.params.rlistid } }
      );
      //await u.addReview(review)

      if (rlist[0] != 0) {
        let { id, booktitle, bookauthor, status, UserId } =
          await ReadingList.findOne({ where: { id: req.params.rlistid } });
        //console.log("+++++++++++++++++")
        //console.log(rlist)
        message = {
          message: "Reading List updated!",
          data: { id, booktitle, bookauthor, status, UserId },
        };
      } else {
        message = {
          message: "Can't update reading list, wrong reading list ID.",
          data: null,
        };
      }
    } else {
      message = {
        message: "Can't update reading list, user does not exist",
        data: null,
      };
    }
  } catch (err) {
    message = { message: "Reading List Update Failed" };
    console.log(err);
  }
  res.json(message);
});

router.delete("/delete/:rlistid", validateJWT, async (req, res) => {
  let message;
  console.log(User);
  try {
    let u = req.user; // await User.findOne({ where: { id: req.params.userid } })
    if (u) {
      let rlist = await ReadingList.destroy({
        where: { UserId: u.id, id: req.params.rlistid },
      });
      //await u.addReview(review)

      //let { id, booktitle, bookauthor, reviewtext, rating } = await Review.findOne({ where: { id: req.params.reviewid } })
      //console.log("+++++++++++++++++")
      //console.log(review)
      message = { message: "Reading LIst item deleted!" };
    } else {
      message = {
        message: "Can't delete reading list item, user does not exist",
        data: null,
      };
    }
  } catch (err) {
    message = { message: "Reading List Item Deletion Failed" };
    console.log(err);
  }
  res.json(message);
});

module.exports = router;
