import React from "react";
import { useState } from "react";
import DateRangeWindow from "./DateRangeWindow";
import { format } from "date-fns";

const TimeSearch = ({ handleTimes }) => {
  const [searchDetails, setSearchDetails] = useState({
    startDate: "",
    endDate: "",
    licensePlate: "",
  });

  const handleDates = (selection) => {
    setSearchDetails((prevData) => ({
      ...prevData,
      startDate: format(selection.startDate, "yyyy-MM-dd"),
      endDate: format(selection.endDate, "yyyy-MM-dd"),
    }));
  };

  const handleSearch = async () => {
    const query = new URLSearchParams(searchDetails).toString();

    try {
      const response = await fetch(`/api/search?${query}`, {
        method: "GET",
      });

      const json = await response.json();
      handleTimes(json);
    } catch {
      console.error("Failed server request");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      
      <DateRangeWindow className="dates" handleDates={handleDates} />
      <div className="option-row">
        <div className="col-md-5">
          <label htmlFor="startDate" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            name="startDate"
            value={searchDetails.startDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="endDate" className="form-label">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            name="endDate"
            value={searchDetails.endDate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="licensePlate" className="form-label">
            Specific License Plate
          </label>
          <input
            type="text"
            id="licensePlate"
            className="form-control"
            name="licensePlate"
            value={searchDetails.licensePlate}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2 align-self-end">
          <button
            id="updateButton"
            className="btn btn-primary mt-2"
            onClick={() => handleSearch()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSearch;
