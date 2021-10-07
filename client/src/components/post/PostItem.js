import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/post";
import { deletePost } from "../../actions/post";
import { Link } from "react-router-dom";
const PostItem = ({
  post: { _id, name, text, date, likes, comments, user, avatar },
  auth,
  addLike,
  removeLike,
  deletePost,
  showActions,
}) => (
  <div class="post bg-white p-1 my-1">
    <div>
      <a href="profile.html">
        <img
          class="round-img"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
          alt=""
        />
        <h4>{name}</h4>
      </a>
    </div>
    <div>
      <p class="my-1">{text}</p>
      <p class="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      {showActions && (
        <>
          {" "}
          <button
            type="button"
            class="btn btn-light"
            onClick={() => addLike(_id)}
          >
            <i class="fas fa-thumbs-up"></i>
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <button
            type="button"
            class="btn btn-light"
            onClick={() => removeLike(_id)}
          >
            <i class="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/posts/${_id}`} class="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span class="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && auth.user._id === user && (
            <button
              type="button"
              class="btn btn-danger"
              onClick={(e) => deletePost(_id)}
            >
              <i class="fas fa-times"></i>
            </button>
          )}
        </>
      )}
    </div>
  </div>
);
PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
