import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./pages/Home/HomePage";
import SignInPage from "../src/pages/Login/SignInPage";
import SignUpPage from "../src/pages/SignUp/SignUpPage";
import TransactionsPage from "./pages/Transaction/TransactionPage";
import UserProvider from "./Context/UserContext";

export default function App() {

  return (
    <PagesContainer>
      
      <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/transactions/:type" element={<TransactionsPage />} />
        </Routes>
        </UserProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`