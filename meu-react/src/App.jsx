import { BrowserRouter, Route, Routes } from "react-router-dom";
import CriarProduto from "./components/projeto-final/pages/CriarProduto";
import EditarProduto from "./components/projeto-final/pages/EditarProduto";
import Login from "./components/projeto-final/pages/Login";
import Registrar from "./components/projeto-final/pages/Registrar";
import RootRoute from "./components/projeto-final/pages/RootRoute";
import "./components/projeto-final/theme.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/criar-produto" element={<CriarProduto />} />
        <Route path="/produto/:id" element={<EditarProduto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
