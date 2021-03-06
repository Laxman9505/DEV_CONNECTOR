import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const guestLinks = (
    <ul>
      <li>
        <a href="profiles.html">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
    </ul>
  );
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">posts</Link>
      </li>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <a onClick={logout}>Logout</a>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
