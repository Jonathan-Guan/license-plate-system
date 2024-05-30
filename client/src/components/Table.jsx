import "bootstrap/dist/css/bootstrap.min.css";
import LicenseEntry from "./LicenseEntry";
import { useEffect } from "react";

const Table = ({ licenses }) => {

  
  return (
    <div className="container mt-5">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Date/Time</th>
            <th scope="col">License Number</th>
            <th scope="col">State</th>
            <th scope="col">Color</th>
            <th scope="col">Image</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {licenses.map((licenseEntry, index) => (
            <LicenseEntry key={index} entry={{...licenseEntry, image_path:`/api/${licenseEntry.image_path}`
          }} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
