import React from "react";
import PassEntry from "./PassEntry";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Pass.css"

const PassTable = ({ passes }) => {
  return (
    <>
      {(passes && passes.length) ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">License Number</th>
              <th scope="col">Name</th>
              <th scope="col">Start Date</th>
              <th scope="col">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {passes.map((pass_entry, index) => (
              <PassEntry key={index} entry={pass_entry} />
            ))}
          </tbody>
        </table>
      ) : null}
    </>
  );
};

export default PassTable;
