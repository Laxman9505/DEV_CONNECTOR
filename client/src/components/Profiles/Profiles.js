import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getProfiles } from "../../actions/profile";
import ProfileItem from "./ProfileItem";
const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <>
      {!loading && profiles.length > 0 ? (
        profiles.map((profile) => (
          <ProfileItem key={profile._id} profile={profile} />
        ))
      ) : (
        <>There is not profile</>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
