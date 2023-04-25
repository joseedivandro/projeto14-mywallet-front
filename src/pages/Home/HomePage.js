import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../routes/routes";
import { UserContext } from "../../Context/UserContext";
import { Transactions, loadNavigate } from "./Home";

export default function HomePage() {

  const {user} = useContext(UserContext)
  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState(localStorage.name);
  const navigate = useNavigate();

  useEffect(() => {
    Transactions(user, setTransactions, setName);
  }, []);

  const sumsByType = transactions.reduce((acc, transaction) => {
    const type = transaction.type;
    const value = transaction.value;
    if (!acc[type]) {
      acc[type] = 0;
    }
    acc[type] += value;
    return acc;
  }, {});
  
  const increaseSum = sumsByType["increase"] || 0;
  const decreaseSum = sumsByType["decrease"] || 0;
  const result = increaseSum - decreaseSum;
  

  function logOut() {
    localStorage.clear();
    navigate("/")
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {name}</h1>
        <BiExit onClick={() => logOut()} />
      </Header>

      <TransactionsContainer>
        {transactions.length === 0 ? <>
        <span>Não há registros de entrada ou saída</span>
        </> : <>
         <ul>
        {transactions.slice().reverse().map(transaction => (
          <ListItemContainer key={transaction._id}>
            <div>
              <span>{transaction.date}</span>
              <span>{transaction.description}</span>
            </div>
            <Value color={transaction.type}>{Number(transaction.value).toFixed(2)}</Value>
          </ListItemContainer>

              ))}
        </ul>
                <article>
                <strong>Saldo</strong>
                <Value color={result >= 0 ? "increase" : "decrease"}>{Number(result).toFixed(2)}</Value>
              </article> </>}

      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => loadNavigate("increase", navigate)}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => loadNavigate("decrease", navigate)}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  span{
    color: gray;
    font-size: 20px;
    align-self: center;
    margin-top: 10%;
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "increase" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`