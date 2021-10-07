import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import { getPost } from "../../actions/post";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PostItem from "../post/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
const SingelPost = ({ getPost, post: { post, loading }, match }) => {
  const { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post._id} />
      <div className="comments">
        {!loading &&
          post.comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
      </div>
    </>
  );
};

SingelPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});
export default connect(mapStateToProps, { getPost })(SingelPost);
