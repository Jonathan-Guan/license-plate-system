import React from "react";
import LicenseSearch from "./LicenseSearch";
import Table from "./Table";
import { useState } from "react";

const SearchTable = () => {
  const [licenses, setLicenses] = useState([]);
  const handleLicenses = (json) => {
    setLicenses(json);
  };
  
  return (
    <div className="col">
      <LicenseSearch handleLicenses={handleLicenses} />
      <Table licenses={licenses}/>
    </div>
  );
};

export default SearchTable;
