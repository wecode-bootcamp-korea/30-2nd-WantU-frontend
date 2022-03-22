import React from 'react';
import { useNavigate } from 'react-router';
import './One.scss';

function One({ id, img, title, company, area }) {
  const navigate = useNavigate();

  const goToJob = () => {
    navigate(`/job/${id}`);
  };

  return (
    <div className="one">
      <img onClick={goToJob} src={img} alt="office" />
      <p onClick={goToJob} className="title">
        {title}
      </p>
      <p className="company">{company}</p>
      <p className="area">{area}</p>
    </div>
  );
}

export default One;
