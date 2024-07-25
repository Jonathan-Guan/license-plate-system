import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken } from "../App";
import "../components/pass-components/Pass.css";

const EditPassPage = () => {
  const formatDate = (sqlDate) => {
    if (!sqlDate) return "";
    return new Date(sqlDate).toISOString().split("T")[0]; // Format to YYYY-MM-DD
  };

  const loaderData = useLoaderData() || null;
  const navigate = useNavigate();

  const [state, setState] = useState((loaderData !== "null")? {
    ...loaderData.entries[0],
    issue_date: formatDate(loaderData.entries[0].issue_date),
    exp_date: formatDate(loaderData.entries[0].exp_date),
  } : {});

  useEffect(()=>{
    if (loaderData === "null"){
      navigate("/", { state: { failedAccess: true}});
    }
  })


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
    const response = await fetch(`/api/edit_pass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(state),
    });

    if (response.ok) {
      toast.success("Pass changed successfully");
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
              className="form-control"
              name="name"
              value={state.name || ""}
              onChange={handleChange}
            />
          </div>
          <div className="optionContainer">
            <label htmlFor="issue_date" className="form-label">
              Issue Date
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
          <div className="flex justify-between pt-4">
            <button type="submit">Ok</button>
            <button
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

const passLoader = async ({ params }) => {
  console.log(params);
  return fetch(`/api/get/passes?${params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  })
    .then((response) => response.json())
    .then((data) => {
      if(data)
        return data
      else
        console.log("no data")
    })
    .catch((error) => {
      console.error(error);
      return "null";
    });
  }
export { EditPassPage as default, passLoader };
