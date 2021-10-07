const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const ProfileModel = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const request = require("request");
const config = require("config");
//@route GET api/profile/me
//@desc Get current users profile
//@access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );
    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    return res.json(profile);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("server error");
  }
});

//@route POST api/profile/
//@desc Create or update user profile
//@access Private

router.post(
  "/",
  [
    auth,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.sendStatus(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    //Build profile object

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;

    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (typeof skills != Array) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = ProfileModel.findOne({ user: req.user.id });

      if (!profile) {
        //update
        profile = await ProfileModel.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      } else {
        //create
        profile = new ProfileModel(profileFields);

        await profile.save();

        res.json(profile);
      }
    } catch (error) {
      console.error(error.message);
      return res.sendStatus(500).send("server error");
    }
  }
);
//@route GET api/profile/
//@desc  Get all users profile
//@access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await ProfileModel.find().populate("user", [
      "name",
      "avatar",
    ]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.send(500).json({ msg: "server error" });
  }
});

//@route GET api/profile/user/:user_id
//@desc  Get profile by user ID
//@access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "profile not found" });
    }
    res.status(500).send("server error");
  }
});
//@route DELETE api/profile
//@desc  Delete profile , user and posts
//@access Private

router.delete("/", auth, async (req, res) => {
  try {
    //remove profile
    await ProfileModel.findOneAndRemove({
      user: req.user.id,
    });
    //remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "user deleted" });
  } catch (error) {
    console.error(error.message);

    res.status(500).send("server error");
  }
});
//@route PUT api/profile/experience
//@desc add profile experience
//@access Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "from date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } =
      req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await ProfileModel.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).json("server errror");
    }
  }
);
//@route DELETE api/profile/experience/:exp_id
//@desc delete profile experience
//@access Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id });

    //remove experience
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.json("server error");
  }
});
//@route PUT api/profile/education
//@desc add profile education
//@access Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "school is required").not().isEmpty(),
      check("degree", "degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "from date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await ProfileModel.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).json("server errror");
    }
  }
);
//@route DELETE api/profile/education/:edu_id
//@desc delete profile education
//@access Private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id });

    //remove experience
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.json("server error");
  }
});
//@route GET api/profile/github/:username
//@desc Get user repos from Github
//@access Public

router.get("/github/:username", (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        "githubClientId"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: { "user-agent": "node-js" },
    };
    request(options, (error, response, body) => {
      if (error) console.log(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No github profile found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.send(500).send("server error");
  }
});

module.exports = router;
