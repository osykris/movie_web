import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDetailProduct } from "../service/Query";
import Box from "@mui/material/Box";
import NavbarComp from "../components/NavbarComp";
import { Grid, Paper, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DetailProduct = () => {
  const { id } = useParams();
  const { data } = useDetailProduct(id);
  const navigate = useNavigate();

  const numberWithComma = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <NavbarComp />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 2 }}
        >
          <div style={{ marginTop: "7%", textAlign: "left", marginLeft: "2%"  }}>
            <Button variant="contained" onClick={() => navigate(-1)}>
              <ArrowBackIcon></ArrowBackIcon> Go Back
            </Button>
          </div>
          {data?.data.map((item) => (
            <>
              <Grid
                item
                xs={2}
                sm={4}
                md={4}
                key={item.id}
                style={{ textAlign: "start" }}
              >
                <Paper sx={{ pt: 2, pb: 1, pl: 3, fontWeight: 700 }}>
                  {item.name} ({item.name_category})
                </Paper>
                <Paper sx={{ pl: 3, color: "secondary.main" }}>
                  Rp. {numberWithComma(item.price)}
                </Paper>
                <Paper sx={{ pl: 3, pb: 2 }}>{item.description}</Paper>
              </Grid>
            </>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default DetailProduct;
