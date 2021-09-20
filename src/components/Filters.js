import React from "react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useGlobalContext } from "../context";
const Filters = () => {
  const { search, setSearch, filterApi, selectRef, setSearchType } =
    useGlobalContext();

  const inputTextHandler = (e) => {
    e.preventDefault();
    setSearchType("name");
    setSearch(e.target.value);
  };

  return (
    <section className="filters">
      <div className="filters__search">
        <form onChange={inputTextHandler}>
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
          <select
            name="regions"
            id="regions"
            ref={selectRef}
            onChange={filterApi}
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT" disabled>
              Filter by Region
            </option>
            <option value="all">All</option>
            <option value="africa">Africa</option>
            <option value="americas">America</option>
            <option value="asia">Asia</option>
            <option value="europe">Europe</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default Filters;
