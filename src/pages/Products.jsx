import * as React from "react";
import Box from "@mui/material/Box";
import NavbarComp from "../components/NavbarComp";
import TableCat from "../components/tables/TableCat";
// import TableProduct from "../components/tables/TableProduct";
import { useState } from "react";
import {
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
import { useGetCategory, useAddProduct, useGetProduct } from "../service/Query";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { BeatLoader } from "react-spinners";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from "./Invoice";

export const Products = () => {

  const fileName = "Product.pdf";

  const columns = [
    { id: "name", name: "Name" },
    { id: "price", name: "Price" },
    { id: "name_category", name: "Category" },
  ];

  const { products, isLoading, isError, error } = useGetProduct();

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

  const { category } = useGetCategory();
  const [name, namechange] = useState("");
  const [price, pricechange] = useState("");
  const [description, desctiptionchange] = useState("");
  const [type, typechange] = useState("");

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <NavbarComp />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}
        >
          <div style={{ marginTop: "7%", textAlign: "left", marginLeft: "1%" }}>
            <Button variant="contained" onClick={functionAdd}>
              Add New (+)
            </Button>
            <PDFDownloadLink
              document={<PdfDocument productData={products} />}
              fileName={fileName}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading..." : <Button variant="contained" color="success" style={{ margin : "10px"}}>Download</Button>
              }
            </PDFDownloadLink>
          </div>
          {isLoading ? (
            <span>{<BeatLoader />}</span>
          ) : isError ? (
            <span>{"Error..." + error.message}</span>
          ) : (
            <TableCat columns={columns} datas={products}></TableCat>
          )}
        </Box>
      </Box>

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
};

export default Products;
