import React, { useEffect } from "react";
import { getProfileById } from "../../actions/profile";
import Spinner from "../Spinner/Spinner";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import { getProfiles } from "../../actions/profile";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

const Profile = ({
  getProfiles,
  auth,
  profile: { profile, loading },
  getProfileById,
  state,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    console.log("now it is working");
  }, [getProfileById]);

  return (
    <>
      {loading && profile == null ? (
        <Spinner />
      ) : (
        <Link to="/profiles" className="btn btn-light">
          Back to profiles
        </Link>
      )}
      {auth.isAuthenticated &&
        loading == false &&
        auth.user._id === profile.user._id && (
          <Link to="/edit-profile" className="btn btn-dark">
            Edit profile
          </Link>
        )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile}></ProfileTop>
      </div>
      <div class="profile-about bg-light p-3" style={{ marginTop: "0" }}>
        <ProfileAbout profile={profile} />
      </div>
      <ProfileExperience experience={profile.experience} />
      <ProfileEducation education={profile.education} />
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  state,
});

export default connect(mapStateToProps, {
  getProfileById,
  getProfiles,
})(Profile);
