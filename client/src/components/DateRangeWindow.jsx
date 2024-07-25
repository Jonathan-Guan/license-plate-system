import React from "react";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { subDays } from "date-fns";
import { DateRange } from "react-date-range";
import { DateRangePicker } from "rsuite";
import "rsuite/DateRangePicker/styles/index.css";

const DateRangeWindow = ({ handleDates }) => {
  const { afterToday } = DateRangePicker;
  const handleChange = (date) => {
    handleDates(date);
  };

  return (
    <DateRangePicker
      onChange={handleChange}
      shouldDisableDate={afterToday()}
      size="lg"
    />
  );
};

export default DateRangeWindow;
