const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");

//@route GET api/auth
//@desc Test route
//@access Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//@route POST api/auth
//@desc get token in login
//@access Public
router.post(
  "/",
  [
    check("email", "please include a valid email").isEmail(),

    check("password", "password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      const isMatch = await bycrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      //Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        "mySecretToken",
        { expiresIn: 360000 },
        (error, token) => {
          if (error) {
            throw error;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server erroris");
    }
  }
);

module.exports = router;
