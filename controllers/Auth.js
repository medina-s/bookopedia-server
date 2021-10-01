let express = require("express");
let router = express.Router();
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let validateJWT = require("../middleware/validate-jwt");

router.post("/register/", async (req, res) => {
  let message;
  console.log(User);
  try {
    const user = await User.create({
      username: req.body.user.username,
      password: bcrypt.hashSync(req.body.user.password, 13),
      firstname: req.body.user.firstname,
      lastname: req.body.user.lastname,
      email: req.body.user.email,
      role: req.body.user.role,
    });

    let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 6 * 60 * 24,
    });

    message = {
      message: "User Registered",
      user: user,
      sessionToken: token,
    };
  } catch (err) {
    console.log(err)
    console.log(req.body);
    message = {
      message: "Failed to Create User",
    };
  }
  res.json(message);
});

router.post("/login/", async (req, res) => {
  let { email, password } = req.body.user;

  try {
    const loginUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (loginUser) {
      let passwordComparison = await bcrypt.compare(
        password,
        loginUser.password
      );

      if (passwordComparison) {
        let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
          expiresIn: 6 * 60 * 24,
        });

        res.status(200).json({
          user: loginUser,
          message: "User successfully logged in!",
          sessionToken: token,
        });
      } else {
        res.status(401).json({
          message: "Incorrect email or password",
        });
      }
    } else {
      res.status(401).json({
        message: "Incorrect email or password",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Failed to log in user!",
    });
  }
});

router.delete("/delete/u/:userid", validateJWT, async (req, res) => {
  let message;
  console.log(User);
  try {
    let u = req.user; // await User.findOne({ where: { id: req.params.userid } })
    if (u.role == "admin") {
      let user = await User.destroy({ where: { id: req.params.userid } });
      //await u.addReview(review)

      //let { id, booktitle, bookauthor, reviewtext, rating } = await Review.findOne({ where: { id: req.params.reviewid } })
      //console.log("+++++++++++++++++")
      //console.log(review)
      message = { message: "User deleted!" };
    } else {
      message = { message: "Access Denied.", data: null };
    }
  } catch (err) {
    message = { message: "User Delete Failed" };
    console.log(err);
  }
  res.json(message);
});

router.get("/u/all", validateJWT, async (req, res) => {
  try {
    let u = req.user; // await User.findOne({ where: { id: req.params.userid }})

    //let reviews = u ? await u.getReviews() : null
    if (u.role == "admin") {
      let users = await User.findAll({where: { role: "general" }});
      let all_users = users.map((r) => {
        const { id, firstname, lastname, username, email, role } = r;
        return { id, firstname, lastname, username, email, role };
      });

      res.send(all_users);
    } else {
      message = { message: "Access Denied" };
      //console.log(err)
      res.send(message);
    }
    //res.send(reviews)
  } catch (err) {
    message = { message: "Users Fetch Failed" };
    console.log(err);
    res.send(message);
  }
});

module.exports = router;
