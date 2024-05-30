import React, { useState } from "react";
import SmallImage from "./SmallImage";
import "./LicenseEntry.css";
import ImageLocation from "./ImageLocation";

const LicenseEntry = ({ entry }) => {
  // Convert date to readable format
  const date = new Date(entry.entry_time).toLocaleString("en-US");
  return (
    <tr className="table-row">
      <td>{date}</td>
      <td>{entry.license}</td>
      <td>{entry.state}</td>
      <td>{entry.color}</td>
      <td>
        <SmallImage imgPath={entry.image_path} />
      </td>
      <td>
        <ImageLocation latitude={entry.latitude} longitude={entry.longitude} />
      </td>
    </tr>
  );
};

export default LicenseEntry;
