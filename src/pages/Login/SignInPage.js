import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import styled from "styled-components"
import MyWalletLogo from "../../components/MyWalletLogo"
import { UserContext } from "../../Context/UserContext"
import { ThreeDots } from "react-loader-spinner";
import {  toSend } from "./SignIn";

export default function SignInPage() {
  const {user, setUser} = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  function handleLogin(formData, setFormData, e, isButtonClicked) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (isButtonClicked) {
      setLoading(true);
    }
  }
  
  return (
    <SingInContainer>
      <form onSubmit={(e) => {
        e.preventDefault();
        setIsButtonClicked(true);
        toSend(e, formData, setUser, navigate);
      }}>
        <MyWalletLogo />
        <input 
          placeholder="E-mail" 
          type="email" 
          name="email"
          onChange={(e) => handleLogin(formData, setFormData, e, false)}
          value={formData.email}
          required
        />

        <input
          placeholder="Senha" 
          type="password" 
          name="password"
          autoComplete="new-password" 
          onChange={(e) => handleLogin(formData, setFormData, e, false)}
          value={formData.password}
          required
        />

<button 
  type="submit"
  disabled={loading || !formData.email || !formData.password}
  onClick={(e) => {
    e.preventDefault();
    setIsButtonClicked(true);
    setLoading(true);
    toSend(e, formData, setUser, navigate)
      .catch(() => setLoading(false));
  }}
>
  {loading ? (
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
    "Entrar"
  )}
</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
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

`