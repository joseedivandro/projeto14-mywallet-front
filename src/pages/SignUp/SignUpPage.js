import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../../components/MyWalletLogo"
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import SignUp from "./SignUp";

export default function SignUpPage() {
  const Navigate = useNavigate();
  const [ nome, setNome ] = useState();
  const [ email, setEmail ] = useState();
  const [ senha, setSenha ] = useState();
  const [ validate, setValidate ] = useState();
  const [loading, setLoading] = useState(false);

  function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    SignUp(nome, email, senha, validate, Navigate, setLoading);
  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input placeholder="E-mail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Senha" type="password" autoComplete="new-password" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" value={validate} onChange={(e) => setValidate(e.target.value)} />

        <button type="submit" disabled={loading}>
          {loading ? (
            <ThreeDots
              marginBottom="20px"
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
      </form>

      <Link to={"/"} disabled={loading}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`