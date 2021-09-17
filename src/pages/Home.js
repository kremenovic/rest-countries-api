import React from "react";
import Filters from "../components/Filters";
import { useGlobalContext } from "../context";
import Loading from "../components/Loading";
import Country from "../components/Country";
const Home = () => {
  const { countries, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      <div className="section">
        <Filters />
        <div className="countries">
          {countries.map((item) => {
            return <Country key={item.countryCode} {...item} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default Home;