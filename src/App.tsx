import { Stack } from "@mui/material";
import { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Components/Shared/Header/Header";
import { ContextTypes } from "./Interfaces/Interfaces";
import { Home } from "./Pages/Home/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { Footer } from "./Components/Shared/Footer/Footer";
import { Register } from "./Pages/Authentication/Register";
import { Login } from "./Pages/Authentication/Login";

const queryClient = new QueryClient();

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
    color = "#1e293b";
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={{ checked, handleChange }}>
        <Stack sx={{ backgroundColor, color }}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </Stack>
      </Context.Provider>
    </QueryClientProvider>
  );
};

export default App;
