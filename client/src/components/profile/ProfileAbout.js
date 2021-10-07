import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <>
      {" "}
      <h2 class="text-primary">{name}'s Bio</h2>
      <p>{bio}</p>
      <div class="line"></div>
      <h2 class="text-primary">Skill Set</h2>
      <div class="skills">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div className="p-1" key={index}>
              <i className="fa fa-check"></i>
              {skill}
            </div>
          ))
        ) : (
          <h4>There aren't any skills corresponding to the user </h4>
        )}
      </div>
    </>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
