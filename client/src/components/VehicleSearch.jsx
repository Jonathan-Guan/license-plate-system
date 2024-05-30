import React, { useEffect, useState } from "react";
import dropdownMenu from "dropdown-menu-js";
import "./VehicleSearch.css";

const VehicleSearch = (handleVehicle) => {
  const [state, setState] = useState({
    state: "",
    color: "",
    licensePlate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const [colorList, setColorList] = useState([]);
  useEffect(() => {
    const getColors = async () => {
      try {
        const response = await fetch(`/api/colors`, {
          method: "GET",
        });
  
        const json = await response.json();
        setColorList(json);
      } catch {
        console.error("Failed server request");
      }
    };
    getColors();
  }, []);

  useEffect(() => {
    dropdownMenu(
      ".dropdown-container",
      ".dropdown-item",
      ".dropdown-btn",
      "block"
    );
  },[colorList])

  return (
    <div className="search-container">
      <label htmlFor="state" className="form-label">
        State
      </label>
      <input
        type="text"
        id="state"
        className="form-control"
        name="state"
        value={state.state}
        onChange={handleChange}
      />
      <label htmlFor="color" className="form-label">
        Color
      </label>
      <div className="dropdown-container">
        <button className="dropdown-btn">Pick a color...</button>
        {colorList.map((colorEntry, index) => (
          <div key={index} className="dropdown-item">{colorEntry.color}</div>
        ))}
      </div>
      <label htmlFor="licensePlate" className="form-label">
        License Plate
      </label>
      <input
        type="text"
        id="licensePlate"
        className="form-control"
        name="licensePlate"
        value={state.licensePlate}
        onChange={handleChange}
      />
    </div>
  );
};

export default VehicleSearch;
