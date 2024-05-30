import React from "react";
import TimeSearch from "./TimeSearch";
import Table from "./Table";
import { useState } from "react";

const SearchTable = () => {
  const [licenses, setLicenses] = useState([]);
  const handleLicenses = (json) => {
    setLicenses(json);
  };
  
  return (
    <div className="col">
      <TimeSearch handleLicenses={handleLicenses} />
      <Table licenses={licenses}/>
    </div>
  );
};

export default SearchTable;
