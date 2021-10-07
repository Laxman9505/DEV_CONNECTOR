import axios from "axios";
import {
  DELETE_POST,
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  DELETE_ACCOUNT,
  DELETE_COMMENT,
} from "./types";
import { setAlert } from "./alert";

//get all the posts

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/post");
    dispatch({
      type: GET_POSTS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//like the post

export const addLike = (id) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/post/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: response.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//unlike the post

export const removeLike = (id) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/post/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: response.data },
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// delete the post

export const deletePost = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert("post removed", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//add a post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  try {
    const response = await axios.post(`/api/post`, body, config);

    dispatch({
      type: ADD_POST,
      payload: response.data,
    });
    dispatch(setAlert("post added", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//get post by id

export const getPost = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/post/${id}`);
    dispatch({
      type: GET_POST,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//add a comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  try {
    const response = await axios.put(
      `/api/post/comment/${postId}`,
      body,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: response.data,
    });
    dispatch(setAlert("comment added", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//delete a comment

export const deleteComment = (commentId, postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/post/comment/${postId}/${commentId}`);
    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert("comment removed", "success"));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
