import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthForms.css";

const REGISTER_URL = "https://projeto-node-step-t5i1.vercel.app/registrar";

const Registrar = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    role: "",
    senha: "",
  });
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(REGISTER_URL, formData);
      localStorage.setItem("token", response.data.token);
      setMessage("Cadastro realizado com sucesso.");
      navigate("/");
    } catch (error) {
      console.error(
        "Erro ao registrar:",
        error.response?.data || error.message,
      );
      setMessage("Não foi possível realizar o cadastro.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <h1>Registrar</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="register-name">Nome:</label>
          <input
            id="register-name"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="register-email">Email:</label>
          <input
            id="register-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="register-role">Role:</label>
          <input
            id="register-role"
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="register-password">Senha:</label>
          <input
            id="register-password"
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button className="auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
        {message && <p className="auth-message">{message}</p>}
      </form>
      <p className="auth-message">
        Já tem conta?{" "}
        <Link to="/login" className="auth-link">
          Entrar
        </Link>
      </p>
    </section>
  );
};

export default Registrar;
