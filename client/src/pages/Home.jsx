import { useState, useEffect } from "react";
import OptionsBar from "../components/OptionsBar";
import Table from "../components/Table";
import "../components/pagination.css";
import PageNumbering from "../components/PageNumbering";
import { useNavigate } from "react-router-dom";
import { getToken } from "../App";

const Home = () => {

  const [results, setResults] = useState({
    entries: [],
    pageNum: 1,
    totalEntries: 0,
    perPage: 50,
  });

  const [state, setState] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    color: "",
    state: "",
    licensePlate: "",
    page: 1,
    perPage: 2,
  });

  const navigate = useNavigate();

  const handleSearch = () => {
    console.log(state);
    const strOptions = new URLSearchParams(state).toString();
    fetch(`/api/search?${strOptions}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if(data)
          setResults(data)
        else
          console.log("no data")
      })
      .catch((error) => {
        console.error(error);
        navigate("/", { state: { failedAccess: true}});
      });
  };

  const handleChange = (options) => {
    setState((prevData) => ({
      ...prevData,
      ...options,
    }));
    console.log(state);
  };

  useEffect(() => {
    handleSearch();
  }, [state]);

  return (
    <>
      <OptionsBar handleSearch={handleChange}/>
      <Table licenses={results.entries} />
      <PageNumbering
        setPages={setState}
        currPage={results.pageNum}
        totalPages={Math.ceil(results.totalEntries / results.perPage) || 1}
      />
    </>
  );
};

export default Home;
