import React from "react";
import { Link } from "react-router-dom";

const Country = ({
  countryCode,
  countryName,
  flag,
  capital,
  region,
  population,
}) => {
  return (
    <Link to={`/country/${countryName}`}>
      <div className="country">
        <img src={flag} alt={countryName} />
        <div className="country__info">
          <h3>{countryName}</h3>
          <p>
            Population: <span>{population}</span>
          </p>
          <p>
            Region: <span>{region}</span>
          </p>
          <p>
            Capital: <span>{capital}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Country;
