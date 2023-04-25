import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import MyWalletLogo from "../../components/MyWalletLogo";
import { toSend } from "./SignUp";
import { ThreeDots } from "react-loader-spinner";


export default function SignUpPage() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  function handleLogin(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    setIsButtonClicked(true);

    if (e.target.checkValidity()) {
      setLoading(true);
      toSend(formData, navigate, setSubmitError, setLoading)
        .then(() => {
          setShowLoading(true);
        })
        .catch(() => {
          setShowLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleFormSubmit}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" name="name" onChange={handleLogin} value={formData.name} required />

        <input
          placeholder="E-mail"
          type="email"
          name="email"
          onChange={handleLogin}
          value={formData.email}
          pattern="^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,})+$"
          title="Precisa ser um email valido. Exemplo (nome@dominio.com)"
          required
        />

        <input
          placeholder="Senha"
          type="password"
          name="password"
          autoComplete="new-password"
          onChange={handleLogin}
          value={formData.password}
          required
        />

        <input
          placeholder="Confirme a senha"
          type="password"
          name="confirmPassword"
          onChange={handleLogin}
          value={formData.confirmPassword}
          required
        />

        <button type="submit" disabled={loading}>
          {loading && isButtonClicked && !showLoading ? (
            <ThreeDots
              margin-bottom="20px"
              height="30"
              width="60"
              radius="12"
              color="#FFFFFF"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Cadastrar"
          )}
        </button>
        {submitError && <p>Erro ao enviar o formulário. Tente novamente mais tarde.</p>}
      
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;


  button{
    cursor: pointer !important;
    transition: background-color 2s;
  }

  button:hover{
    background-color: black !important;
  }

`;

