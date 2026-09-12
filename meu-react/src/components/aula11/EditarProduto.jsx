import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./AuthForms.css";

const PRODUCTS_URL = "https://projeto-node-step-t5i1.vercel.app/produtos";

const EditarProduto = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    descricao: "",
    categoria: "",
    imagem: "",
    avaliacao: {
      nota: "",
      quantidade: "",
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${PRODUCTS_URL}/${id}`);
        const product = response.data.value ?? response.data;

        setFormData({
          nome: product.nome ?? "",
          preco: product.preco ?? "",
          descricao: product.descricao ?? "",
          categoria: product.categoria ?? "",
          imagem: product.imagem ?? "",
          avaliacao: {
            nota: product.avaliacao?.nota ?? "",
            quantidade: product.avaliacao?.quantidade ?? "",
          },
        });
      } catch {
        setError("Não foi possível carregar os dados do produto.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "nota" || name === "quantidade") {
      setFormData({
        ...formData,
        avaliacao: {
          ...formData.avaliacao,
          [name]: value,
        },
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    const productData = {
      ...formData,
      preco: Number(formData.preco),
      avaliacao: {
        nota: Number(formData.avaliacao.nota),
        quantidade: Number(formData.avaliacao.quantidade),
      },
    };

    try {
      const token = localStorage.getItem("token");
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

      await axios.put(`${PRODUCTS_URL}/${id}`, productData, config);
      setMessage("Produto atualizado com sucesso.");
    } catch {
      setMessage("Não foi possível atualizar o produto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page" data-product-id={id}>
      <h1>Editar Produto</h1>
      {isLoading && <p>Carregando produto...</p>}
      {error && <p role="alert">{error}</p>}
      {!isLoading && !error && (
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="edit-product-name">Nome:</label>
            <input
              id="edit-product-name"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="edit-product-price">Preço:</label>
            <input
              id="edit-product-price"
              name="preco"
              type="number"
              min="0"
              step="0.01"
              value={formData.preco}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="edit-product-description">Descrição:</label>
            <textarea
              id="edit-product-description"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="edit-product-category">Categoria:</label>
            <input
              id="edit-product-category"
              name="categoria"
              type="text"
              value={formData.categoria}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="edit-product-image">Imagem:</label>
            <input
              id="edit-product-image"
              name="imagem"
              type="url"
              value={formData.imagem}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="edit-product-rating">Nota da avaliação:</label>
            <input
              id="edit-product-rating"
              name="nota"
              type="number"
              min="0"
              step="0.1"
              value={formData.avaliacao.nota}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="edit-product-rating-quantity">
              Quantidade de avaliações:
            </label>
            <input
              id="edit-product-rating-quantity"
              name="quantidade"
              type="number"
              min="0"
              step="1"
              value={formData.avaliacao.quantidade}
              onChange={handleChange}
              required
            />
          </div>

          <button className="auth-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar"}
          </button>
          {message && <p className="auth-message">{message}</p>}
        </form>
      )}
    </section>
  );
};

export default EditarProduto;
