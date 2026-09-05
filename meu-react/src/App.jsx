import { BrowserRouter, Route, Routes } from "react-router-dom";
import CriarProduto from "./components/aulas-integradas/CriarProduto";
import EditarProduto from "./components/aulas-integradas/EditarProduto";
import Home from "./components/aulas-integradas/Home";
import Login from "./components/aulas-integradas/Login";
import Registrar from "./components/aulas-integradas/Registrar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/criar-produto" element={<CriarProduto />} />
        <Route path="/produto/:id" element={<EditarProduto />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
