import React from "react";
import ReactPaginate from "react-paginate";
import classes from "./Pagination.module.css";
import { useHistory } from "react-router-dom";

const Pagination = (props) => {
  const history = useHistory();
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const changePage = ({ selected }) => {
    props.setCurrentPage(selected + 1);
    history.push(`${selected + 1}`);
  };
  return (
    <ReactPaginate
      initialPage={props.currentPage - 1}
      previousLabel={"previous"}
      nextLabel={"next"}
      pageCount={pageNumbers.length}
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
    />
  );
};

export default Pagination;
