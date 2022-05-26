import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Typography,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import auth from "../../firebase.init";
import { OrderTypes } from "../../Interfaces/Interfaces";
import CancelButton from "./CancelButton";

export const ManageAllOrders = () => {
  const [tableData, setTableData] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const value = useContext(Context);
  const userEmail = user?.email;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/order/getall`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        if (
          data.message === "Forbidden access" ||
          data.message === "UnAuthorized access"
        ) {
          signOut(auth);
          navigate("/login");
        }
        if (data.message === "Success") {
          setTableData(data.result);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userEmail, navigate]);

  console.log(tableData);

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

  const handleUpdateStatus = (id: string) => {
    const status = { status: "Shipped" };
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/order/put?id=${id}`, {
          method: "PUT",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(status),
        });
        const data = await res.json();
        if (
          data.message === "Forbidden access" ||
          data.message === "UnAuthorized access"
        ) {
          signOut(auth);
          navigate("/login");
        }
        console.log(data);
        if (data.message === "Success") {
          setTableData(data.result);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <TableContainer>
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
              Customer Email
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
              Status
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
        {tableData.map((row: OrderTypes<string>) => (
          <TableRow
            key={row._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell sx={{ color: color2, fontWeight: 800 }}>
              {row.name}
            </TableCell>
            <TableCell sx={{ color: color2, fontWeight: 800 }}>
              {row.email}
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
                <Typography variant="body2">{row.status}</Typography>
              ) : (
                <Typography variant="body2">{row.status}</Typography>
              )}
            </TableCell>
            <TableCell sx={{ color: color2, fontWeight: 800 }} align="center">
              {row.status === "pending" ? (
                <Button onClick={() => handleUpdateStatus(row._id)}>
                  Update Status
                </Button>
              ) : (
                ""
              )}
              {!row.paid ? (
                <CancelButton
                  row={row}
                  setTableData={setTableData}
                  tableData={tableData}
                />
              ) : (
                ""
              )}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};
