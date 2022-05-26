import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import auth from "../../firebase.init";
import { OrderTypes, PartTypes } from "../../Interfaces/Interfaces";
import CancelButton from "./CancelButton";
import DeleteButton from "./DeleteButton";

export const ManageProducts = () => {
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();
  const value = useContext(Context);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://limitless-beach-64664.herokuapp.com/parts",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
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
  }, [navigate]);

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
        const res = await fetch(
          `https://limitless-beach-64664.herokuapp.com/order/put?id=${id}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-type": "application/json",
            },
            body: JSON.stringify(status),
          }
        );
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
          const newArray = [];
          const rest = tableData.filter(
            (row: OrderTypes<string>) => row._id !== id
          );
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
              align="center"
            >
              Image
            </TableCell>
            <TableCell
              sx={{
                bgcolor: backgroundColor,
                color: "inherit",
                fontWeight: 800,
              }}
            >
              Product Name
            </TableCell>
            <TableCell
              sx={{
                bgcolor: backgroundColor,
                color: "inherit",
                fontWeight: 800,
              }}
            >
              Product Price
            </TableCell>
            <TableCell
              sx={{
                bgcolor: backgroundColor,
                color: "inherit",
                fontWeight: 800,
              }}
            >
              Minimum Order Quantity
            </TableCell>
            <TableCell
              sx={{
                bgcolor: backgroundColor,
                color: "inherit",
                fontWeight: 800,
              }}
            >
              Available Quantity
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
        {tableData.map((row: PartTypes<string>) => (
          <TableRow
            key={row._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell sx={{ color: color2, fontWeight: 800 }}>
              <Avatar
                sx={{ width: 50, height: 50, margin: "10px auto" }}
                src={row.img}
              />
            </TableCell>
            <TableCell sx={{ color: color2, fontWeight: 800 }}>
              {row.name}
            </TableCell>
            <TableCell sx={{ color: color2, fontWeight: 800 }}>
              {row.price}
            </TableCell>
            <TableCell sx={{ color: color2, fontWeight: 800 }}>
              {row.minimumOrderQuantity}
            </TableCell>
            <TableCell sx={{ color: color2, fontWeight: 800 }}>
              {row.availableQuantity}
            </TableCell>
            <TableCell sx={{ color: color2, fontWeight: 800 }} align="center">
              <DeleteButton
                row={row}
                setTableData={setTableData}
                tableData={tableData}
              />
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </TableContainer>
  );
};
