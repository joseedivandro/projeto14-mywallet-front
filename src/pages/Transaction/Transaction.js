import { HttpStatusCode } from "axios";
import api from "../../routes/routes";

export function handleTransactionSubmit(navigate, user, formData, setLoading, setType) {
  const valueNumber = Number(parseFloat(formData.value.replace(",", ".")).toFixed(2));
  const body = { ...formData, value: valueNumber };
  const promise = api.createTransaction(user.token, body, setType);
  
  promise.then(() => {
    setLoading(false);
    navigate("/home");
  });

  promise.catch((err) => {
    setLoading(false);
    if (err.response.status === HttpStatusCode.UnprocessableEntity) {
      alert('Verifique se os dados  (Valor precisa ser um número)');
    } else {
      alert('Aconteceu algo de errado, tente novamente mais tarde');
    }
  });
}