import React from "react";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { subDays } from "date-fns";
import { DateRange, DateRangePicker } from "react-date-range";

const DateRangeWindow = ({ handleDates }) => {
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleChange = (item) => {
    setState([item.selection]);
    handleDates(item.selection);
  };

  return (
    <DateRange
      className="justify-content center"
      ranges={state}
      maxDate={new Date()}
      onChange={handleChange}
      showDateDisplay={false}
    />
  );
};

export default DateRangeWindow;
