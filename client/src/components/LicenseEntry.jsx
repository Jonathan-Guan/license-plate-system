import SmallImage from "./SmallImage";
import "./LicenseEntry.css";
import ImageLocation from "./ImageLocation";
import { NavLink } from "react-router-dom";

const LicenseEntry = ({ entry }) => {
  const date = new Date(entry.entry_time).toLocaleString("en-US");

  return (
    <tr
      className={`${
        entry.violation === "Yes" ? "table-row-violation" : "table-row"
      }`}
    >
      <td>{date}</td>
      <td>
        <NavLink
          to="/passes"
          state={{license: entry.license}}
        >
          {entry.license}
        </NavLink>
      </td>
      <td>{entry.state}</td>
      <td>{entry.color}</td>
      <td>
        <SmallImage imgPath={entry.image_path} />
      </td>
      <td>
        <ImageLocation latitude={entry.latitude} longitude={entry.longitude} />
      </td>
      <td>
        <p>{entry.violation}</p>
      </td>
    </tr>
  );
};

export default LicenseEntry;
