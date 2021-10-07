import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { text, user, _id, date, name },
  auth,
  deleteComment,
}) => {
  return (
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
        {user === auth.user._id && (
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => deleteComment(_id, postId)}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
