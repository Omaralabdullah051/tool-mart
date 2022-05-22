import { Stack, Typography } from "@mui/material";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Shared/Header/Header";
import { ContextTypes } from "./Interfaces/Interfaces";
import { Home } from "./Pages/Home/Home";

export const Context = createContext<ContextTypes | null>(null);

const App = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  let theme;
  if (checked) theme = "dark";
  else theme = "light";

  let backgroundColor;
  let color;
  if (theme === "dark") {
    backgroundColor = "#000";
    color = "#e11d48";
  } else {
    backgroundColor = "#fff";
    color = "#000";
  }

  return (
    <Context.Provider value={{ checked, handleChange }}>
      <Stack sx={{ backgroundColor, color }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Stack>
    </Context.Provider>
  );
};

export default App;
