import React, {useState} from "react";
import "./OptionsBar.css";

import TimeSearch from "./TimeSearch";
import VehicleSearch from "./VehicleSearch";

const OptionsBar = ({ handleSearch }) => {
  const [state, setState] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    color: "",
    state: "",
    violation: "",
    licensePlate: "",
    page: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(state);
  };

  return (
    <>
      <TimeSearch handleTimes={handleChange} />
      <VehicleSearch handleChange={handleChange} />
      <button
        id="updateButton"
        className="btn btn-primary mx-4 mt-2"
        onClick={() => handleSearch(state)}
      >
        Search
      </button>
    </>
  );
};

export default OptionsBar;
