import axios from "axios";

export function SignIn(email, senha, Navigator, setLoading) {

  const body = { email: email, senha: senha };
  axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, body)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      Navigator("/home");
    })
    .catch((error) => {
      alert(error.response.data)
    })
    .finally(() => {
      setLoading(false);
    });
}