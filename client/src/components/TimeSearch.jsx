import React from "react";
import { useState } from "react";
import DateRangeWindow from "./DateRangeWindow";
import { format } from "date-fns";
import styles from "./TimeSearch.module.css";
import TimeRange from "./TimeRange";

const TimeSearch = ({ handleTimes }) => {
  const [searchDetails, setSearchDetails] = useState({
    startDate: "",
    endDate: "",
    //startTime: "",
    //endTime: "",
  });

  const handleDates = (dates) => {
    setSearchDetails((prevData) => ({
      ...prevData,
      startDate: format(dates[0], "yyyy-MM-dd"),
      endDate: format(dates[1], "yyyy-MM-dd"),
    }));
    handleTimes(searchDetails);
  };

  // const handleTime = (time) => {
  //   setSearchDetails((prevData) => ({
  //     ...prevData,
  //     startTime: format(time[0], "HH-mm-ss"),
  //     endTime: format(time[1], "HH-mm-ss"),
  //   }));
  //   handleTimes(searchDetails);
  // };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.optionContainer}>
        <label htmlFor="dates">Date Range</label>
        <DateRangeWindow className="dates" handleDates={handleDates} />
      </div>
      {/* <div className={styles.optionContainer}>
        <label htmlFor="times">Time Range</label>
        <TimeRange className="times" handleTime={handleTime} />
      </div> */}
    </div>
  );
};

export default TimeSearch;
