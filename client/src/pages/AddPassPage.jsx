import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken } from "../App";
import "../components/pass-components/Pass.css";

const AddPassPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state);
    const strOptions = new URLSearchParams(state).toString();
    const response = await fetch(`/api/add_pass`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(state),
    });

    if (response.ok){
      toast.success("Pass added successfully");
      navigate("/passes");
    }
    else{
      navigate("/", { state: { failedAccess: true}});
    }
  };

  return (
    <div className="flex">
      <div className="formBox">
        <form className="flex space-y-5" onSubmit={handleSubmit}>
          <div className="optionContainer">
            <label htmlFor="licensePlate" className="form-label">
              License Plate
            </label>
            <input
              type="text"
              id="licensePlate"
              className="formControl"
              name="license"
              value={state.license || ""}
              onChange={handleChange}
            />
          </div>
          <div className="optionContainer">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="formControl"
              name="name"
              value={state.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="optionContainer">
            <label htmlFor="issue_date" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              id="issue_date"
              className="form-control"
              name="issue_date"
              value={state.issue_date || ""}
              onChange={handleChange}
            />
          </div>
          <div className="optionContainer">
            <label htmlFor="exp_date" className="form-label">
              Expiration Date
            </label>
            <input
              type="date"
              id="exp_date"
              className="form-control"
              name="exp_date"
              value={state.exp_date || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex pt-4">
            <button type="submit">Ok</button>
            <button className="justify-self-end"
            onClick={() => {
              navigate("/passes");
            }}
          >
            Cancel
          </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default AddPassPage;
