import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Pagination from "./Pagination";
import { useState } from "react";

const TableCat = ({ columns, datas }) => {
  const [rowPerPage, rowPerPageChange] = useState(5);
  const [page, pageChange] = useState(0);

  const handlePageChange = (event, newpage) => {
    pageChange(newpage);
  };

  const handleRowPerPageChange = (event) => {
    rowPerPageChange(+event.target.value);
    pageChange(0);
  };

  return (
    <div>
      <Paper sx={{ marginTop: "2%" }}>
        <div>
          <TableContainer style={{ padding: "3%" }}>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#6495ED" }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} style={{ color: "white" }}>
                      {column.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {datas &&
                  datas
                    .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                    .map((row, i) => {
                      return (
                        <>
                          <TableRow key={i}>
                            {columns.map((column, i) => (
                              <TableCell key={i}>{row[column.id]}</TableCell>
                            ))}
                          </TableRow>
                        </>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            counts={datas}
            rowPerPages={rowPerPage}
            pages={page}
            handlePageChanges={handlePageChange}
            handleRowPerPageChanges={handleRowPerPageChange}
          />
        </div>
      </Paper>
    </div>
  );
};

export default TableCat;
