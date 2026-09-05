import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthForms.css";

const LOGIN_URL = "https://projeto-node-step-t5i1.vercel.app/login";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
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
      const response = await axios.post(LOGIN_URL, formData);
      localStorage.setItem("token", response.data.token);
      setMessage("Login realizado com sucesso.");
      navigate("/");
    } catch {
      setMessage("Não foi possível realizar o login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="auth-page">
      <h1>Login</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-field">
          <label htmlFor="login-email">Email:</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label htmlFor="login-password">Senha:</label>
          <input
            id="login-password"
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button className="auth-submit" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
        {message && <p className="auth-message">{message}</p>}
      </form>
      <p className="auth-message">
        Não tem conta?{" "}
        <Link to="/registrar" className="auth-link">
          Registre-se
        </Link>
      </p>
    </section>
  );
};

export default Login;
