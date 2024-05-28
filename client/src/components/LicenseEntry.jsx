import React, { useState } from "react";
import SmallImage from "./SmallImage";
import "./LicenseEntry.css";

const LicenseEntry = ({ entry }) => {
  // Convert date to readable format
  const date = new Date(entry.entry_time).toLocaleString("en-US");
  return (
    <tr className="table-row">
      <td>{date}</td>
      <td>{entry.license}</td>
      <td>
        <SmallImage imgPath={entry.image_path} />
      </td>
    </tr>
  );
};

export default LicenseEntry;
