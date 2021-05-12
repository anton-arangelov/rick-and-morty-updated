import React from "react";
import ReactPaginate from "react-paginate";
import classes from "./Pagination.module.css";
import { useHistory, useLocation } from "react-router-dom";

const Pagination = (props) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search)
  const pageNumber = searchParams.get('page')

  const changePage = ({selected}) => {
    searchParams.set('page',selected+1)
    history.push(`?${searchParams.toString()}`);
    
  };
  return (
    <ReactPaginate
      initialPage={pageNumber - 1}
      previousLabel={"previous"}
      nextLabel={"next"}
      pageCount={props.pages}
      onPageChange={changePage}
      containerClassName={classes.paginationBttns}
      previousLinkClassName={classes.previousBttns}
      nextLinkClassName={classes.nextBttns}
      disabledClassName={classes.paginationDisabled}
      breakLabel={"..."}
      breakClassName={"break-me"}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      activeClassName={classes.paginationActive}
      disableInitialCallback={true}
    />
  );
};

export default Pagination;
