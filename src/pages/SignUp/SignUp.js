import axios from "axios";

export default function SignUp(nome, email, senha, validate, Navigate, setLoading) {
  if (!(senha === validate)) return alert("Senhas não conferem");
  const data = { nome: nome, email, senha: senha };
  axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, data)
    .then(() => {
      alert(`Usuário criado`);
      Navigate("/");
    })
    .catch((error) => {
      alert(error.response.data);
      setLoading(false);
    })
}
