import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import Experience from "./Experience";
import Education from "./Education";
import DashboardActions from "./DashboardActions";
import { deleteAccount } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile == null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead" style={{ textTransform: "capitalize" }}>
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i>
              Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </>
      )}
    </>
  );
};
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
