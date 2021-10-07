import React from "react";
import PropTypes from "prop-types";
import ExperienceItem from "./ExperienceItem";

const ProfileExperience = ({ experience }) => {
  return (
    <div class="profile-exp bg-white p-2">
      <h2 class="text-primary">Experience</h2>
      {experience.length > 0 ? (
        <>
          {experience.map((experience) => (
            <ExperienceItem id={experience._id} experience={experience} />
          ))}
        </>
      ) : (
        <>
          <h4>No experience credentials</h4>
        </>
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.array.isRequired,
};

export default ProfileExperience;
