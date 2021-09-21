import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const SingleItem = ({
  name,
  nativeName,
  population,
  flag,
  region,
  subregion,
  capital,
  topLevelDomain,
  currencies,
  languages,
  borders,
}) => {
  const { countries, loading } = useGlobalContext();
  const borderCountryNames = [];

  const findBorder = countries.find((border, index) => {
    if (border.countryName === name) {
      let borderCountries = border.borders;
      borderCountries.forEach((country) => {
        let nesto = countries.find((item, index) => {
          if (item.countryCode === country) {
            borderCountryNames.push(item.countryName);
          }
        });
      });
    }
  });

  return (
    <div className="singleCountry__row">
      <div className="flagContainer">
        <img src={flag} alt={`Flag of ${name}`} />
      </div>
      <div className="infoContainer">
        <h1>{name}</h1>
        <div className="infoContainer__basicInfo">
          <h4>
            Native Name: <span>{nativeName}</span>
          </h4>
          <h4>
            Population:{" "}
            <span>
              {population.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </h4>
          <h4>
            Region: <span>{region}</span>
          </h4>
          <h4>
            Sub Region: <span>{subregion}</span>
          </h4>
          <h4>
            Capital: <span>{capital}</span>
          </h4>
          <h4>
            Top Level Domain: <span>{topLevelDomain}</span>
          </h4>
          <h4>
            Currencies:{" "}
            {currencies.map((currency, index) => (
              <span key={index}>{currency.name}</span>
            ))}
          </h4>
          <h4>
            Languages:{" "}
            {languages.map((language, index) => (
              <span key={index}>{language.name} </span>
            ))}
          </h4>
        </div>
        <div className="infoContainer__borders">
          <h4>
            Border Countries:{" "}
            {borderCountryNames.length ? (
              borderCountryNames.map((border, index) => (
                <Link to={`/country/${border}`} key={index}>
                  <span key={index}>{border} </span>
                </Link>
              ))
            ) : (
              <span>None</span>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
