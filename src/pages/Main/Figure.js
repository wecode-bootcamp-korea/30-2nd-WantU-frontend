import React from 'react';
import One from './One';
import './Figure.scss';

function Figure({ recruits }) {
  return (
    <figure className="figure">
      {recruits.map(company => (
        <One
          key={company.job_position_id}
          id={company.job_position_id}
          img={company.company_image}
          title={company.title}
          company={company.company_name}
          area={company.company_location}
        />
      ))}
    </figure>
  );
}

export default Figure;
