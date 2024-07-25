import React, { useEffect, useState } from "react";
import PassSearch from "../components/pass-components/PassSearch";
import PassTable from "../components/pass-components/PassTable";
import PageNumbering from "../components/PageNumbering";
import { getToken } from "../App";
import { useLocation, useNavigate } from "react-router-dom";



const handleSearch = (options = {}) => {
  const strOptions = new URLSearchParams(options).toString();
  return fetch(`/api/get/passes?${strOptions}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    }
  }).then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.error(error));
};


const PassPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [results, setResults] = useState({
    entries: [],
    pageNum: 1,
    totalEntries: 0,
    perPage: 3,
  });

  const [state, setState] = useState({
    page: 1,
    perPage: 3,
    ...location.state,
  });

  useEffect(() => {
    console.log(state);
    handleSearch(state).then((data) => {
      if (data) setResults(data);
      else {
        navigate("/", { state: { failedAccess: true}});
      }
    });
  }, [state]);

  return (
    <>
      <PassSearch setOptions={setState} initialState={state}/>
      <PassTable passes={results.entries} />
      <PageNumbering
        setPages={setState}
        currPage={results.pageNum}
        totalPages={Math.ceil(results.totalEntries / results.perPage) || 1}
      />
    </>
  );
};

// Export PassPage as the default export
export default PassPage;

// Export handleSearch as a named export
export { handleSearch };