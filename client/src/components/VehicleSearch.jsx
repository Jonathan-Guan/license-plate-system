import React, { useEffect, useState } from "react";
import styles from "./VehicleSearch.module.css";

const VehicleSearch = ({ handleChange }) => {
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    const getColors = async () => {
      try {
        const response = await fetch(`/api/colors`, {
          method: "GET",
        });

        const json = await response.json();
        console.log(json.map((item) => item.color));
        setColorList(json.map((item) => item.color));
      } catch {
        console.error("Failed server request");
      }
    };
    if (colorList.length == 0) {
      getColors();
    }
  }, []);

  return (
    
    <div className="search-container">
      <div className="option-container">
        <label htmlFor="licensePlate" className="form-label">
          License Plate
        </label>
        <input
          type="text"
          id="licensePlate"
          className="form-control"
          name="licensePlate"
          onChange={handleChange}
        />
      </div>
      <div className="option-container">
        <label htmlFor="state" className="form-label">
          State
        </label>
        <select name="state" onChange={handleChange} className="form-dropdown">
          <option value="">All</option>
          {states.map((US_state, index) => (
            <option key={index} value={US_state}>
              {US_state}
            </option>
          ))}
        </select>
      </div>
      <div className="option-container">
        <label htmlFor="color" className="form-label">
          Color
        </label>
        <select name="color" onChange={handleChange} className="form-dropdown">
          <option value="">All</option>
          {colorList.map((colorEntry, index) => (
            <option key={index} value={colorEntry}>
              {colorEntry}
            </option>
          ))}
        </select>
      </div>
      
      <div className="option-container">
        <label htmlFor="violation" className="form-label">
          Violation
        </label>
        <select name="violation" onChange={handleChange} className="form-dropdown">
          <option value="">All</option>
          <option value="Yes">Violations</option>
          <option value="No">Non-Violations</option>
        </select>
      </div>
    </div>
  );
};

export default VehicleSearch;
