const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route POST api/post
//@desc Create a post
//@access Private
router.post(
  "/",
  [auth, [check("text", "text is required").not().isEmpty()]],
  async (req, res) => {
    const errros = validationResult(req);
    if (!errros.isEmpty()) {
      return res.status(400).json({ errros: errros.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.send(500).send("server error");
    }
  }
);
//@route GET api/posts
//@desc Get all posts
//@access Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});
//@route GET api/posts/:id
//@desc Get post by ID
//@access Private

router.get("/:post_Id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_Id);
    if (!post) {
      return res.status(400).json({ msg: "post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "post not found" });
    }
    res.status(500).send("server errror");
  }
});
//@route DELETE api/posts/:id
//@desc delete post by Id
//@access Private
router.delete("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(500).json({ msg: "post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }
    await post.remove();
    res.json({ msg: "post removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      res.status(500).json({ msg: "post not found" });
    }
    res.status(500).send("server error");
  }
});
//@route PUT api/posts/like/:id
//@desc Like a post
//@access Private

router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(401).json({ msg: "post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
  }
});
//@route PUT api/posts/unlike/:id
//@desc disLike a post
//@access Private
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    //check if the post has been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(401).json({ msg: "post hasnt yet been liked" });
    }
    //Get remove index
    const removeIndex = post.likes
      .map((item) => item.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
  }
});
//@route PUT api/posts/comment/:id
//@desc add a comment in the post
//@access Private

router.put(
  "/comment/:post_id",
  [auth, [check("text", "text field is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.post_id);

      const newComment = {
        name: user.name,
        avatar: user.avatar,
        text: req.body.text,
        user: user.id,
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);
//@route DELETE api/posts/comment/:post_id/:comment_id
//@desc delete the comment
//@access Private

router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    //pull out the comment

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //make sure the comment exists
    if (!comment) {
      return res.status(400).json({ msg: "comment doest not exist" });
    }
    //check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user not authorized" });
    }
    // get the remove Index
    const removeIndex = post.comments
      .map((item) => item.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
