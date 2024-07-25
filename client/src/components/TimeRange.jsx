import React from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";

const TimeRange = ({ handleTime }) => {
  return <DateRangePicker format="HH:mm:ss" size="lg" onChange={handleTime} />;
};

export default TimeRange;
