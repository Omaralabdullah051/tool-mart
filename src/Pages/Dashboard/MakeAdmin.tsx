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
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import auth from "../../firebase.init";
import { OrderTypes, PartTypes } from "../../Interfaces/Interfaces";
import CancelButton from "./CancelButton";

export const MakeAdmin = () => {
  const navigate = useNavigate();
  const value = useContext(Context);

  const {
    data: tableData,
    isLoading,
    refetch,
  } = useQuery("getallusers", () =>
    fetch(`http://localhost:5000/user/getall`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-type": "application/json",
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <p>...loading</p>;
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

  const handleMakeAdmin = (email: string | undefined) => {
    const status = { role: "admin" };
    (async () => {
      try {
        const res = await fetch(`http://localhost:5000/user/put/${email}`, {
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
          refetch();
        }
        refetch();
      } catch (err) {
        console.log(err);
      }
    })();
  };
  console.log(tableData);

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
              User Name
            </TableCell>
            <TableCell
              sx={{
                bgcolor: backgroundColor,
                color: "inherit",
                fontWeight: 800,
              }}
            >
              User Email
            </TableCell>
            <TableCell
              sx={{
                bgcolor: backgroundColor,
                color: "inherit",
                fontWeight: 800,
              }}
            >
              Role
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
        {tableData.result.map((row: PartTypes<string>) => (
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
              {row.email}
            </TableCell>
            <TableCell sx={{ color: color2, fontWeight: 800 }}>
              {!row.role ? "User" : "Admin"}
            </TableCell>

            <TableCell sx={{ color: color2, fontWeight: 800 }} align="center">
              {!row.role ? (
                <Button onClick={() => handleMakeAdmin(row.email)}>
                  Make Admin
                </Button>
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
