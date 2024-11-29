import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "styled-components";
import THEME from "./theme";
import "./styles.css";

import Login from "./views/login";
import Register from "./views/register";
import Home from "./views/home";
import AddTransaction from "./views/addTransaction";
import EditTransaction from "./views/editTransaction";
import RecoverPassword from "./views/recoverPassword";
import ResetPassword from "./views/resetPassword";

const root = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(root).render(
  <ThemeProvider theme={THEME}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/adicionarTransação" element={<AddTransaction />} />
        <Route path="/editarTransação/:id" element={<EditTransaction />} />
        <Route path="/recuperarSenha" element={<RecoverPassword />} />
        <Route path="/resetarSenha/:token" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
