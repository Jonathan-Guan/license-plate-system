import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const PageNumbering = ({ totalPages=1, setPages, currPage }) => {

  useEffect(() => {
    setPage(0);
  }, [currPage])
  const [page, setPage] = useState(null);


  
  const handlePageClick = (e) => {
    setPage(null);
    setPages((prevState) => ({
      ...prevState,
      page: e.selected + 1,
    }));
  };

  return (
    <ReactPaginate
      previousLabel={"previous"}
      nextLabel={"next"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={totalPages}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      subContainerClassName={"pages pagination"}
      activeClassName={"active"}
      forcePage={page}
    />
  );
};

export default PageNumbering;
