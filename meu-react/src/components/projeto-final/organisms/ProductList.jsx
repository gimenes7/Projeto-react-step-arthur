import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../molecules/ProductCard";
import ProductFilter from "../molecules/ProductFilter";
import "./ProductList.css";

const PRODUCTS_URL = "https://projeto-node-step-t5i1.vercel.app/produtos";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [filterValue, setFilterValue] = useState("");

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

  const productNames = useMemo(
    () => products.map((product) => product.nome).filter(Boolean),
    [products],
  );

  const filteredProducts = useMemo(() => {
    if (!filterValue) return products;
    return products.filter((product) => product.nome === filterValue);
  }, [products, filterValue]);

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

  return (
    <section>
      <ProductFilter options={productNames} onFilter={setFilterValue} />
      {isLoading && <p>Carregando produtos...</p>}
      {error && <p role="alert">{error}</p>}
      {deleteError && <p role="alert">{deleteError}</p>}
      {!isLoading && !error && (
        <ul className="product-list">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onEdit={() => navigate(`/produto/${product._id}`)}
              onDelete={() => handleDelete(product._id)}
              isDeleting={deletingId === product._id}
            />
          ))}
          {filteredProducts.length === 0 && <p>Nenhum produto encontrado.</p>}
        </ul>
      )}
    </section>
  );
};

export default ProductList;
