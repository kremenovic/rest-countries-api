import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
const Filters = () => {
  return (
    <section className="filters">
      <div className="filters__search">
        <form>
          <FaSearch />
          <input
            className="input-field"
            type="text"
            placeholder="Search for a country…"
          ></input>
        </form>
      </div>
      <div className="filters__select">
        <div className="dropdown">
          <button className="dropdown__filterBtn">
            Filter by Region <MdKeyboardArrowDown />
          </button>
          <div className="dropdown__content">
            <option value="Africa">Africa</option>
            <option value="America">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Ocenia">Ocenia</option>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Filters;
