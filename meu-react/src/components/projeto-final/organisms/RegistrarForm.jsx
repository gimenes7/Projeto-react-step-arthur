import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import "./forms.css";

const REGISTER_URL = "https://projeto-node-step-t5i1.vercel.app/registrar";

const RegistrarForm = () => {
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
        <FormField
          id="register-name"
          label="Nome:"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <FormField
          id="register-email"
          label="Email:"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FormField
          id="register-role"
          label="Role:"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
        <FormField
          id="register-password"
          label="Senha:"
          name="senha"
          type="password"
          value={formData.senha}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
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

export default RegistrarForm;
