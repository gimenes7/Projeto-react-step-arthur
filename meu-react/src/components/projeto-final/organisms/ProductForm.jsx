import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import "./forms.css";

const PRODUCTS_URL = "https://projeto-node-step-t5i1.vercel.app/produtos";

const emptyProduct = {
  nome: "",
  preco: "",
  descricao: "",
  categoria: "",
  imagem: "",
  avaliacao: { nota: "", quantidade: "" },
};

const ProductForm = ({ mode, productId }) => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState(emptyProduct);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  const [loadError, setLoadError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode !== "edit") return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${PRODUCTS_URL}/${productId}`);
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
        setLoadError("Não foi possível carregar os dados do produto.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [mode, productId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "nota" || name === "quantidade") {
      setFormData({
        ...formData,
        avaliacao: { ...formData.avaliacao, [name]: value },
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
      const config = token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : undefined;

      if (mode === "edit") {
        await axios.put(`${PRODUCTS_URL}/${productId}`, productData, config);
        setMessage("Produto atualizado com sucesso.");
      } else {
        await axios.post(PRODUCTS_URL, productData, config);
        setMessage("Produto cadastrado com sucesso.");
        setFormData(emptyProduct);
      }
    } catch {
      setMessage(
        mode === "edit"
          ? "Não foi possível atualizar o produto."
          : "Não foi possível cadastrar o produto.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!token) {
    return (
      <section className="auth-page">
        <h1>{mode === "edit" ? "Editar Produto" : "Criar Produto"}</h1>
        <p className="auth-message">
          Você precisa estar logado para{" "}
          {mode === "edit" ? "editar" : "criar"} um produto.
        </p>
        <p className="auth-message">
          <Link to="/login" className="auth-link">
            Fazer login
          </Link>{" "}
          ou{" "}
          <Link to="/registrar" className="auth-link">
            criar uma conta
          </Link>
        </p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="auth-page">
        <h1>Editar Produto</h1>
        <p>Carregando produto...</p>
      </section>
    );
  }

  if (loadError) {
    return (
      <section className="auth-page">
        <h1>Editar Produto</h1>
        <p role="alert">{loadError}</p>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <h1>{mode === "edit" ? "Editar Produto" : "Criar Produto"}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <FormField
          id="product-name"
          label="Nome:"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <FormField
          id="product-price"
          label="Preço:"
          name="preco"
          type="number"
          min="0"
          step="0.01"
          value={formData.preco}
          onChange={handleChange}
          required
        />
        <FormField
          id="product-description"
          label="Descrição:"
          name="descricao"
          as="textarea"
          rows="4"
          value={formData.descricao}
          onChange={handleChange}
          required
        />
        <FormField
          id="product-category"
          label="Categoria:"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        />
        <FormField
          id="product-image"
          label="Imagem:"
          name="imagem"
          type="url"
          value={formData.imagem}
          onChange={handleChange}
          required
        />
        <FormField
          id="product-rating"
          label="Nota da avaliação:"
          name="nota"
          type="number"
          min="0"
          step="0.1"
          value={formData.avaliacao.nota}
          onChange={handleChange}
          required
        />
        <FormField
          id="product-rating-quantity"
          label="Quantidade de avaliações:"
          name="quantidade"
          type="number"
          min="0"
          step="1"
          value={formData.avaliacao.quantidade}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </section>
  );
};

export default ProductForm;
