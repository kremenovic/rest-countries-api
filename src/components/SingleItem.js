import { useGlobalContext } from "../context";
import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

import Loading from "../components/Loading";

const SingleItem = () => {
  const countryName = useParams();
  const { loading, setLoading } = useGlobalContext();
  const [singleCountry, setSingleCountry] = useState([]);

  const url = "https://restcountries.com/v2/alpha/";

  let id = countryName.countryCode;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let response = await fetch(`${url}${id}`);
      let data = await response.json();
      setSingleCountry(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="singleCountry__row">
      <div className="flagContainer">
        <img src={singleCountry.flag} alt={`Flag of `} />
      </div>
      <div className="infoContainer">
        <h1>{singleCountry.name}</h1>
        <div className="infoContainer__basicInfo">
          <h4>
            Native Name: <span>{singleCountry.nativeName}</span>
          </h4>
          <h4>
            Population:{" "}
            <span>
              {singleCountry?.population?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </h4>
          <h4>
            Region: <span>{singleCountry.region}</span>
          </h4>
          <h4>
            Capital: <span>{singleCountry.capital}</span>
          </h4>
          <h4>
            Top Level Domain: <span>{singleCountry.topLevelDomain}</span>
          </h4>
          <h4>
            Currencies:{" "}
            {singleCountry?.currencies?.map((currency, index) => {
              return <span key={index}>{currency.name}</span>;
            })}
          </h4>
          <h4>
            Languages:{" "}
            {singleCountry?.languages?.map((language, index) => {
              return <span key={index}>{language.name}</span>;
            })}
          </h4>
        </div>
        <div className="infoContainer__borders">
          <h4>
            Borders:
            <ul>
              {singleCountry?.borders?.map((border, index) => {
                return (
                  <Link key={index} to={`/country/${border}`}>
                    <li>{border}</li>
                  </Link>
                );
              })}
            </ul>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
