import React from "react";
import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  Stack,
  Select,
  DialogContent,
  MenuItem,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetProduct,
  useGetCategory,
  useAddProduct,
  useDeleteProduct,
} from "../../service/Query";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function TableProduct() {
  const columns = [
    { id: "name", name: "Name" },
    { id: "price", name: "Price" },
    { id: "category", name: "Category" },
    { id: "action", name: "Action" },
  ];

  const { products } = useGetProduct();

  // for pagination
  const [rowPerPage, rowPerPageChange] = useState(5);
  const [page, pageChange] = useState(0);

  const handlePageChange = (event, newpage) => {
    pageChange(newpage);
  };

  const handleRowPerPageChange = (event) => {
    rowPerPageChange(+event.target.value);
    pageChange(0);
  };

  const numberWithComma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const { category } = useGetCategory();
  const [name, namechange] = useState("");
  const [price, pricechange] = useState("");
  const [description, desctiptionchange] = useState("");
  const [type, typechange] = useState("");

  // add product
  const functionAdd = () => {
    titlechange("Create Product");
    openpopup();
  };

  const { addProd } = useAddProduct();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = Object.fromEntries(formData);
    addProd({
      ...product,
    });
    closepopup();
    Swal.fire({
      icon: "success",
      title: "Success",
      type: "success",
      text: "Produk berhasil ditambahkan!",
    }).then((result) => {
      if (result.value) {
        // This check here. This contains value for the delete button. Its null for cancel button
        window.location.reload();
      }
    });
  };

  // remove product
  const { DeleteProd } = useDeleteProduct();
  const handleRemove = (code) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "This product will be deleted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          DeleteProd(code);
          swalWithBootstrapButtons
            .fire("Deleted!", "product has been deleted.", "success")
            .then((result) => {
              if (result.value) {
                window.location.reload();
              }
            });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your imaginary file is safe :)",
            "error"
          );
        }
      });
  };

  // for dialog
  const [open, openchange] = useState(false);
  const [title, titlechange] = useState("Create Product");

  const closepopup = () => {
    openchange(false);
  };

  const clearstate = () => {};

  const openpopup = () => {
    openchange(true);
    clearstate();
  };

  return (
    <div>
      <Paper sx={{ margin: "1%" }}>
        <div style={{ marginTop: "7%", textAlign: "left", marginLeft: "1%" }}>
          <Button variant="contained" onClick={functionAdd}>
            Add New (+)
          </Button>
        </div>
        <div style={{ margin: "1%" }}>
          <TableContainer>
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
                {products &&
                  products
                    .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                    .map((row, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>
                            Rp. {numberWithComma(row.price)}
                          </TableCell>
                          <TableCell>{row.name_category}</TableCell>
                          <TableCell>
                            <Link to={`/detail/${row.id}`}>
                              <Button
                                size="small"
                                variant="contained"
                                color="warning"
                              >
                                <SearchIcon />
                              </Button>
                            </Link>
                            <Button
                              size="small"
                              onClick={(e) => {
                                handleRemove(row.id);
                              }}
                              variant="contained"
                              color="error"
                            >
                              <DeleteIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 5, 10, 20]}
            component={"div"}
            rowsPerPage={rowPerPage}
            page={page}
            count={products && products.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowPerPageChange}
          ></TablePagination>
        </div>
      </Paper>
      <Dialog open={open} onClose={closepopup} fullWidth maxWidth="sm">
        <DialogTitle>
          <span>{title}</span>
          <IconButton style={{ float: "right" }} onClick={closepopup}>
            <CloseIcon color="primary"></CloseIcon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} margin={2}>
              <TextField
                value={name}
                onChange={(e) => {
                  namechange(e.target.value);
                }}
                required
                variant="outlined"
                label="Name"
                name="name"
              ></TextField>
              <TextField
                value={price}
                onChange={(e) => {
                  pricechange(e.target.value);
                }}
                required
                variant="outlined"
                label="Price"
                name="price"
              ></TextField>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                variant="outlined"
                required
                value={type}
                onChange={(e) => {
                  typechange(e.target.value);
                }}
                name="category"
              >
                {category &&
                  category.map((cat) => (
                    <MenuItem value={cat.id}>{cat.name_category}</MenuItem>
                  ))}
              </Select>
              <TextField
                multiline
                maxRows={2}
                minRows={2}
                variant="outlined"
                label="Description"
                required
                value={description}
                onChange={(e) => {
                  desctiptionchange(e.target.value);
                }}
                name="description"
              ></TextField>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
