import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { useContext } from "react";
import { Context } from "../../App";

export const MyOrders = () => {
  const value = useContext(Context);

  let theme;
  if (value?.checked) theme = "dark";
  else theme = "light";

  let backgroundColor: string;
  let color: string;
  let color2: string;
  let color3: string;
  if (theme === "dark") {
    backgroundColor = "#111827";
    color = "#e11d48";
    color2 = "#52525b";
    color3 = "#6b7280";
  } else {
    backgroundColor = "#d6d3d1";
    color = "#1e293b";
    color2 = "#334155";
    color3 = "#000";
  }
  return (
    <TableContainer
      //   component={Paper}
      sx={{ maxHeight: "300px" }}
    >
      <Table aria-label="simple-table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ bgcolor: backgroundColor, color: "inherit" }}>
              Id
            </TableCell>
            <TableCell sx={{ bgcolor: backgroundColor, color: "inherit" }}>
              First name
            </TableCell>
            <TableCell sx={{ bgcolor: backgroundColor, color: "inherit" }}>
              Last name
            </TableCell>
            <TableCell
              sx={{ bgcolor: backgroundColor, color: "inherit" }}
              align="center"
            >
              Email
            </TableCell>
          </TableRow>
        </TableHead>
        {/* {tableData.map((row) => (
          <TableRow
            key={row.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.first_name}</TableCell>
            <TableCell>{row.last_name}</TableCell>
            <TableCell align="center">{row.email}</TableCell>
          </TableRow>
        ))} */}
      </Table>
    </TableContainer>
  );
};
