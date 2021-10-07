import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState("");
  const formData = { text };
  const submitHandler = (e) => {
    e.preventDefault();
    addComment(postId, formData);
    setText("");
  };

  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Add a comment...</h3>
      </div>
      <form class="form my-1" onSubmit={(e) => submitHandler(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a comment"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {};

export default connect(null, { addComment })(CommentForm);
