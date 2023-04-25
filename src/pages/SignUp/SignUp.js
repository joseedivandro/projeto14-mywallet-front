import api from "../../routes/routes";

export function toSend(formData, navigate) {
  if (formData.password !== formData.confirmPassword) return alert("As senhas digitadas não coincidem!");

  const { confirmPassword, ...sendData } = formData;
  console.log(sendData);

  const promise = api.signUp({ ...sendData });
  promise
    .then((response) => {
      console.log(response.data);
      navigate("/");
    })
    .catch((error) => {
      if (error.response.status === 422) {
        alert("O cadastro falhou. Verifique as senhas e a quantidade de caracteres mínima");
        window.location.reload();
      } else if (error.response.status === 409) {
        alert("Email já utilizado");
        window.location.reload();
      }
    });
}