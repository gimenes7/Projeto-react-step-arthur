import axios from "axios";
import { useState } from "react";
import "./AuthForms.css";

const PRODUCTS_URL = "https://projeto-node-step-t5i1.vercel.app/produtos";

const CriarProduto = () => {
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
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      await axios.post(PRODUCTS_URL, productData, config);
      setMessage("Produto cadastrado com sucesso.");
    } catch {
      setMessage("Não foi possível cadastrar o produto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <h1>Criar Produto</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="product-name">Nome:</label>
          <input
            id="product-name"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="product-price">Preço:</label>
          <input
            id="product-price"
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
          <label htmlFor="product-description">Descrição:</label>
          <textarea
            id="product-description"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            rows="4"
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="product-category">Categoria:</label>
          <input
            id="product-category"
            name="categoria"
            type="text"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="product-image">Imagem:</label>
          <input
            id="product-image"
            name="imagem"
            type="url"
            value={formData.imagem}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="product-rating">Nota da avaliação:</label>
          <input
            id="product-rating"
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
          <label htmlFor="product-rating-quantity">
            Quantidade de avaliações:
          </label>
          <input
            id="product-rating-quantity"
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
    </section>
  );
};

export default CriarProduto;
