import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import SingleItem from "../components/SingleItem";
import Loading from "../components/Loading";

import { MdKeyboardBackspace } from "react-icons/md";

const Single = () => {
  const countryName = useParams();
  const { loading, setLoading } = useGlobalContext();
  const [singleCountry, setSingleCountry] = useState([]);

  // const url = "https://restcountries.eu/rest/v2/alpha/";
  const url = "https://restcountries.eu/rest/v2/name/";
  let id = countryName.countryName;

  const fetchCountryData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}${id}`);
      const data = await response.json();
      if (data) {
        setSingleCountry(data);
        setLoading(false);
      } else {
        setSingleCountry([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountryData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="singlePage">
      <div className="section">
        <Link to="/" className="backBtn">
          <MdKeyboardBackspace /> Back
        </Link>
        <section className="singleCountry">
          {singleCountry.map((item, index) => {
            return <SingleItem {...item} key={index} />;
          })}
        </section>
      </div>
    </main>
  );
};

export default Single;
