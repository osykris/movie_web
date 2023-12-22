import Box from "@mui/material/Box";
import NavbarComp from "../components/NavbarComp";
import TableCat from "../components/tables/TableCat";
import { useGetCategory } from "../service/Query";
import { BeatLoader } from "react-spinners";

export default function Categories() {

  const columns = [
    { id: "id", name: "Id" },
    { id: "name_category", name: "Name" },
  ];

  const { category, isLoading, isError, error } = useGetCategory();

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <NavbarComp />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "background.default",
            p: 2,
            marginTop: "4%",
          }}
        >
          {isLoading ? (
            <span>{<BeatLoader />}</span>
          ) : isError ? (
            <span>{"Error..." + error.message}</span>
          ) : (
            <TableCat columns={columns} datas={category} />
          )}
        </Box>
      </Box>
    </div>
  );
}
