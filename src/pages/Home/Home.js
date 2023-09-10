import api from "../../routes/routes";

export function Transactions(user, setTransactions, setName) {
  const promise = api.pullTransaction(user.token);
  promise.then((response) => {
    setName(user.name)
    setTransactions(response.data);
  })
};

export function loadNavigate(type, navigate) {
  navigate(`/transactions/${type}`)
}