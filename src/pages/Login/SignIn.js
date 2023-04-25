import api from "../../routes/routes";


export function toSend(e, formData, setUser, navigate) {
  e.preventDefault();

  const promise = api.signIn({ ...formData });
  promise.then((response) => {
    console.log(response.data);
    const { idUser, token, name } = response.data;
    setUser({ idUser, token, name });
    localStorage.setItem("user", JSON.stringify({ idUser, token, name }));
    navigate("/home");
  });

  promise.catch((error) => {
    if (error.response.status === 404) {
      alert("Email não cadastrado");
      window.location.reload();
    } else if (error.response.status === 401) {
      alert("Senha incorreta");
      window.location.reload();
    } else if (error.response.status === 422) {
      alert("Aconteceu algo errado, tenta novamente mais tarde");
      window.location.reload();
    }
  });
}
