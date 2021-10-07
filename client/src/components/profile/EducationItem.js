import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const EducationItem = ({
  education: { school, degree, fieldofstudy, from, to, current, description },
}) => {
  return (
    <div>
      <h3 class="text-dark">{school}</h3>
      <p>
        {<Moment format="YYYY/MM/DD">{from}</Moment>} -{" "}
        {current ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>degree: </strong>
        {degree}
      </p>
      <p>
        <strong>fieldofstudy: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>description: </strong>
        {description}
      </p>
    </div>
  );
};

EducationItem.propTypes = {
  education: PropTypes.object.isRequired,
};

export default EducationItem;
