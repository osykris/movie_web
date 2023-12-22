import React from "react";
import { TablePagination } from "@mui/material";

const Pagination = ({counts, rowPerPages, pages, handlePageChanges, handleRowPerPageChanges}) => {
  return (
    <div>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 20]}
        component={"div"}
        rowsPerPage={rowPerPages}
        page={pages}
        count={counts && counts.length}
        onPageChange={handlePageChanges}
        onRowsPerPageChange={handleRowPerPageChanges}
      ></TablePagination>
    </div>
  );
};

export default Pagination;
