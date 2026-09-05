import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const PRODUCTS_URL = "https://projeto-node-step-t5i1.vercel.app/produtos";

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(PRODUCTS_URL);
        const productsData = Array.isArray(response.data)
          ? response.data
          : response.data.value;

        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch {
        setError("Não foi possível carregar os produtos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    setDeleteError("");
    setDeletingId(productId);

    try {
      const token = localStorage.getItem("token");
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

      await axios.delete(`${PRODUCTS_URL}/${productId}`, config);
      setProducts((currentProducts) =>
        currentProducts.filter((product) => product._id !== productId),
      );
    } catch {
      setDeleteError("Não foi possível deletar o produto.");
    } finally {
      setDeletingId("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <main>
      <h1>Home</h1>
      <button type="button" onClick={handleLogout}>
        Sair
      </button>
      <Link to="/criar-produto">
        <button type="button">Criar Produto</button>
      </Link>
      {isLoading && <p>Carregando produtos...</p>}
      {error && <p role="alert">{error}</p>}
      {deleteError && <p role="alert">{deleteError}</p>}
      {!isLoading && !error && (
        <ul>
          {products.map((product) => (
            <li className="product-item" key={product._id}>
              <span>{product.nome}</span>
              <div className="product-actions">
                <button
                  type="button"
                  onClick={() => navigate(`/produto/${product._id}`)}>
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product._id)}
                  disabled={deletingId === product._id}>
                  {deletingId === product._id ? "Deletando..." : "Deletar"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Home;
