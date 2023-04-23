import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner";
import { userContext } from "../Context/UserContext"





export default function SignInPage() {
  
  return (
    <SingInContainer>
      <form>
        <MyWalletLogo />
        <input data-test="email" placeholder="E-mail" type="email" />
        <input  data-test="password" placeholder="Senha" type="password" autocomplete="new-password" />
        <button data-test="sign-in-submit">Entrar</button>
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
`
