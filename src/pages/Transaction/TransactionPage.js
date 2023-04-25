// TransactionsPage.js
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { handleTransactionSubmit } from "./Transaction";

export default function TransactionsPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { type } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ description: "", value: "" });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function toSend(e) {
    e.preventDefault();
    setLoading(true);
    handleTransactionSubmit(navigate, user, formData, setLoading, type);
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <Form onSubmit={toSend}>
        <Input
          placeholder="Valor"
          type="text"
          name="value"
          onChange={handleChange}
          value={formData.value}
          required
        />

        <Input
          placeholder="Descrição"
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.description}
          required
        />
        <Button type="submit" disabled={loading}>
          Salvar TRANSAÇÃO
        </Button>
      </Form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`;
const Form = styled.form``;
const Button = styled.button``;
const Input = styled.input``;