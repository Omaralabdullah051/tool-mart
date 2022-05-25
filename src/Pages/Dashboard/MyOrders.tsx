import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import auth from "../../firebase.init";
import { OrderTypes } from "../../Interfaces/Interfaces";
import CancelButton from "./CancelButton";

export const MyOrders = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const value = useContext(Context);
  const {
    data: tableData,
    isLoading,
    refetch,
  } = useQuery(["orders", user], () =>
    fetch(`http://localhost:5000/order/get?email=${user?.email}`).then((res) =>
      res.json()
    )
  );

  console.log(tableData);

  if (isLoading) {
    return <p>loading...</p>;
  }

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

  const handleNavigate = (id: string) => {
    navigate(`/payment/${id}`);
  };

  return (
    <TableContainer
      //   component={Paper}
      sx={{ maxHeight: "300px" }}
    >
      <Table aria-label="simple-table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                bgcolor: backgroundColor,
                color: "inherit",
                fontWeight: 800,
              }}
            >
              Customer Name
            </TableCell>
            <TableCell
              sx={{
                bgcolor: backgroundColor,
                color: "inherit",
                fontWeight: 800,
              }}
            >
              Tool Name
            </TableCell>
            <TableCell
              sx={{
                bgcolor: backgroundColor,
                color: "inherit",
                fontWeight: 800,
              }}
            >
              Address
            </TableCell>
            <TableCell
              sx={{
                bgcolor: backgroundColor,
                color: "inherit",
                fontWeight: 800,
              }}
              align="center"
            >
              Phone
            </TableCell>
            <TableCell
              sx={{
                bgcolor: backgroundColor,
                color: "inherit",
                fontWeight: 800,
              }}
              align="center"
            >
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        {tableData.result.map((row: OrderTypes<string>) => (
          <TableRow
            key={row._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell sx={{ color: color2, fontWeight: 800 }}>
              {row.name}
            </TableCell>
            <TableCell sx={{ color: color2, fontWeight: 800 }}>
              {row.toolName}
            </TableCell>
            <TableCell sx={{ color: color2, fontWeight: 800 }}>
              {row.address}
            </TableCell>
            <TableCell sx={{ color: color2, fontWeight: 800 }} align="center">
              {row.phone}
            </TableCell>
            <TableCell sx={{ color: color2, fontWeight: 800 }} align="center">
              {row.paid ? (
                <Typography variant="body2">paid</Typography>
              ) : (
                <CancelButton row={row} refetch={refetch} />
              )}
              <Button onClick={() => handleNavigate(row._id)}>Payment</Button>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};
