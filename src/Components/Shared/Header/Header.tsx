import { AppBar, Box, Toolbar, Switch } from "@mui/material";
import { Container, Avatar, Button, Tooltip, MenuItem } from "@mui/material";
import { IconButton, Typography, FormControlLabel } from "@mui/material";
import { Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { useContext, useState } from "react";
import { NavTypography } from "./NavTypography";
import { Context } from "../../../App";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [user] = useAuthState(auth);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const navigate = useNavigate();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    navigate("/dashboard");
  };

  const handleNavigate = () => {
    setAnchorElNav(null);
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    setAnchorElUser(null);
    signOut(auth);
    localStorage.removeItem("accessToken");
  };

  const pages = ["Products", "Blog", "Pricing", "Review"];
  const settings = ["Profile", "Account", "Dashboard"];

  const value = useContext(Context);

  let theme;
  if (value?.checked) theme = "dark";
  else theme = "light";

  let backgroundColor: string;
  let color: string;
  let color2: string;
  if (theme === "dark") {
    backgroundColor = "#111827";
    color = "#e11d48";
    color2 = "#000";
  } else {
    backgroundColor = "#d6d3d1";
    color = "#000";
    color2 = "#71717a";
  }
  const img: any = user?.photoURL;

  console.log(user);

  return (
    <AppBar position="static" sx={{ backgroundColor }} color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <NavTypography xs="none" md="flex" flex={{ flexGrow: 0 }} />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", backgroundColor },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
            >
              <MenuItem
                sx={{
                  backgroundColor,
                  color,
                  "&:hover": {
                    backgroundColor: color2,
                  },
                }}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center" fontWeight={700}>
                  Dashboard
                </Typography>
              </MenuItem>
              <FormControlLabel
                sx={{ marginLeft: "5px", backgroundColor, color }}
                label="Dark mode"
                control={
                  <Switch
                    checked={value?.checked}
                    onChange={value?.handleChange}
                    size="small"
                    color="success"
                  />
                }
              />
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <NavTypography xs="flex" md="none" flex={{ flexGrow: 1 }} />
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "end" },
            }}
          >
            {user ? (
              <Button
                onClick={handleCloseNavMenu}
                color="inherit"
                sx={{ my: 2, display: "block", fontWeight: 700 }}
              >
                <Link
                  style={{ textDecoration: "none", color: color }}
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </Button>
            ) : (
              ""
            )}
            <FormControlLabel
              sx={{ marginLeft: "5px" }}
              label="Dark mode"
              control={
                <Switch
                  checked={value?.checked}
                  onChange={value?.handleChange}
                  size="small"
                  color="success"
                />
              }
            />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="" src={img} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      sx={{
                        backgroundColor,
                        color,
                        "&:hover": {
                          backgroundColor: color2,
                        },
                      }}
                      key={setting}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem
                    sx={{
                      backgroundColor,
                      color,
                      "&:hover": {
                        backgroundColor: color2,
                      },
                    }}
                    onClick={handleLogOut}
                  >
                    <Typography textAlign="center">Log out</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={handleNavigate}
                color="inherit"
                sx={{ my: 2, display: "block", fontWeight: 700 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
