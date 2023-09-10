import { HttpStatusCode } from "axios";
import api from "../../routes/routes";

export function toSend(formData, navigate) {
  if (formData.password !== formData.confirmPassword) return alert("As senhas digitadas não coincidem!");

  const { confirmPassword, ...sendData } = formData;

  const promise = api.signUp({ ...sendData });
  promise
    .then((response) => {
      navigate("/");
    })
    .catch((error) => {
      if (error.response.status === HttpStatusCode.UnprocessableEntity) {
        alert("O cadastro falhou. Verifique as senhas e a quantidade de caracteres mínima");
        window.location.reload();
      } else if (error.response.status === HttpStatusCode.Conflict) {
        alert("Email já utilizado");
        window.location.reload();
      }
    });
}