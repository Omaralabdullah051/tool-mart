import { Stack, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Shared/Header/Header";
import { Home } from "./Pages/Home/Home";

const App = () => {
  return (
    <Stack>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Stack>
  );
};

export default App;
