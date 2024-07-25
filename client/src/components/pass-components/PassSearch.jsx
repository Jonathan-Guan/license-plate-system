import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pass.css";

const PassSearch = ({ initialState, setOptions }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    ...initialState,
  });

  // useEffect(() => {
  //   handleOptions(options);
  // }, [options]);

  const handleSearch = () => {
    setOptions((prevState) => ({
      ...prevState,
      ...state,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const checkIfEnter = (e) => {
    if (e.key === "Enter") {
      console.log(e.key);
      handleSearch();
    }
  };

  return (
    <>
      <div className="searchContainer">
        <div className="optionContainer">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="formControl"
            name="name"
            onChange={handleChange}
            onKeyUp={checkIfEnter}
          />
        </div>
        <div className="optionContainer">
          <label htmlFor="licensePlate" className="form-label">
            License Plate
          </label>
          <input
            type="text"
            id="licensePlate"
            className="formControl"
            name="licensePlate" 
            onChange={handleChange}
            onKeyUp={checkIfEnter}
          />
        </div>
        <div className="optionContainer">
          <button onClick={() => handleSearch()}>Search</button>
        </div>
        <div className="optionContainer">
          <button onClick={() => navigate("/add_pass")}>Add Pass</button>
        </div>
      </div>
    </>
  );
};
// Look into limiting to 20 entries, and add arrows (how many do I ask for in the initial fetch request?)
export default PassSearch;
