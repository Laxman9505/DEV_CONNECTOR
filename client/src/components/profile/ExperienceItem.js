import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ExperienceItem = ({
  experience: { title, location, company, from, to, current },
}) => {
  return (
    <div>
      <h3 class="text-dark">{company}</h3>
      <p>
        {<Moment format="YYYY/MM/DD">{from}</Moment>} -{" "}
        {current ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      {location && (
        <p>
          <strong>Location: </strong>
          {location}
        </p>
      )}
    </div>
  );
};

ExperienceItem.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ExperienceItem;
