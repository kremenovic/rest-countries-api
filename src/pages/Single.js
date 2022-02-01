import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context";

import SingleItem from "../components/SingleItem";

import { MdKeyboardBackspace } from "react-icons/md";

const Single = () => {
  return (
    <main className="singlePage">
      <div className="section">
        <Link to="/" className="backBtn">
          <MdKeyboardBackspace /> Back
        </Link>
        <section className="singleCountry">
          <SingleItem />
        </section>
      </div>
    </main>
  );
};

export default Single;
