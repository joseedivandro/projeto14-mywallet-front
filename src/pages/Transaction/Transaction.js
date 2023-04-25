import api from "../../routes/routes";

export function handleTransactionSubmit(navigate, user, formData, setLoading, setType) {
  const valueNumber = Number(parseFloat(formData.value.replace(",", ".")).toFixed(2));
  const body = { ...formData, value: valueNumber };
  const promise = api.createTransaction(user.token, body, setType);
  
  promise.then((response) => {
    console.log(response.data);
    setLoading(false);
    navigate("/home");
  });

  promise.catch((err) => {
    console.log(err.response.data.message);
    setLoading(false);
    if (err.response.status === 422) {
      alert('Verifique se os dados  (Valor precisa ser um número)');
    } else {
      alert('Aconteceu algo de errado, tente novamente mais tarde');
    }
  });
}