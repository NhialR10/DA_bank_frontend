import React, { useState } from "react";

const SearchBox = ({ onSearch, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
      <input
        className="form-control mr-sm-2"
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        value={searchTerm}
        onChange={handleInputChange}
        required
        style={{ marginTop: "10px", marginBottom: "10px" }} // Add margin to the right of the input
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
