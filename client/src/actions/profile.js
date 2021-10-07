import axios from "axios";
import { setAlert } from "./alert";

import {
  PROFILE_ERROR,
  GET_PROFILE,
  UPDATE_PROFILE,
  DELETE_ACCOUNT,
  CLEAR_PROFILE,
  GET_PROFILES,
} from "./types";

//Get current user profile

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.msg,
        status: error.response.status,
      },
    });
  }
};

//create or update profile

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formData);
      const response = await axios.post("/api/profile", body, config);

      dispatch({
        type: GET_PROFILE,
        payload: response.data,
      });
      dispatch(
        setAlert(edit ? "profile updated" : "profile created", "success")
      );
      console.log(response);
      history.push("/dashboard");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

//Add experience

export const addExperience = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  try {
    const response = await axios.put("/api/profile/experience", body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
    dispatch(setAlert("Experience added", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add education

export const addEducation = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(formData);
  try {
    const response = await axios.put("/api/profile/education", body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
    dispatch(setAlert("Experience added", "success"));
    history.push("/dashboard");
  } catch (error) {
    console.error(error.message);
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(error.msg, "danger"));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//delete an experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
    dispatch(setAlert("Experience Removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//delete an education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data,
    });
    dispatch(setAlert("Education Removed", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This cant be undone!")) {
    try {
      await axios.delete("/api/profile");
      dispatch({
        type: DELETE_ACCOUNT,
      });
      dispatch({ type: CLEAR_PROFILE });
      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  }
};
//get all profiles

export const getProfiles = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/profile");
    dispatch({
      type: GET_PROFILES,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//get profile by id
export const getProfileById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/user/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
