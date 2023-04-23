import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../../components/MyWalletLogo"
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { SignIn } from "./SignIn";

export default function SignInPage() {

  const Navigator = useNavigate();
  const [email, setEmail] = useState();
  const [senha, setsenha] = useState();
  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    SignIn(email, senha, Navigator, setLoading);
  }

  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
        <input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <input
          placeholder="Senha"
          type="password"
          autoComplete="new-senha"
          value={senha}
          onChange={(e) => { setsenha(e.target.value) }}
        />

        <button
          type="submit"
          disabled={loading}
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
      <Link to={"/cadastro"}>
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
`