import React from "react";
import PropTypes from "prop-types";
import EducationItem from "./EducationItem";

const ProfileEducation = ({ education }) => {
  return (
    <div class="profile-edu bg-white p-2">
      <h2 class="text-primary">Education</h2>
      {education.length > 0 ? (
        <>
          {education.map((education) => (
            <EducationItem id={education._id} education={education} />
          ))}
        </>
      ) : (
        <>
          <h4>No education credentials</h4>
        </>
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.array.isRequired,
};

export default ProfileEducation;
