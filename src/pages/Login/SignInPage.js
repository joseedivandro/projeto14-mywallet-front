import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import MyWalletLogo from "../../components/MyWalletLogo"
import axios from "axios"
import { ThreeDots } from "react-loader-spinner";
import { userContext } from "../../Context/UserContext"





export default function SignInPage() {

  const navigate = useNavigate()

  const [userLogin, setUserLogin] = useState('')
  const [disableInfo, setDisableInfo] = useState(false)
  const [userPassword, setUserPassword] = useState('')

  const { setUserReceivedInfo } = useContext(userContext)

  function enviaLoginUser(e) {
    e.preventDefault()

    setDisableInfo(true)

    const url = `${process.env.REACT_APP_API_URL}/sign-in`

    const infoLoginUser = {
        email: userLogin,
        senha: userPassword
    }

    axios.post(url, infoLoginUser)
        .then(res => {
            const userInfoToStore = JSON.stringify(res.data)
            localStorage.setItem('userInfo', userInfoToStore)
            setUserReceivedInfo(JSON.parse(userInfoToStore))
            setDisableInfo(false)
            navigate("/hoje")
        })
        .catch(err => {
            console.log(err)
            setDisableInfo(false)
            alert('Usuário ou senha invalido(s), tente novamente')
        })
}
  
  return (
    <SingInContainer>
      <form onSubmit={(e) => enviaLoginUser(e)}>
        <MyWalletLogo />
        <input
                    value={userLogin}
                    type="email"
                    disabled={disableInfo}
                    onChange={(e) => setUserLogin(e.currentTarget.value)}
                    placeholder="email"
                />
       <input
                    value={userPassword}
                    type="password"
                    disabled={disableInfo}
                    onChange={(e) => setUserPassword(e.currentTarget.value)}
                    placeholder="senha"
                />
      <button
                    type="submit"
                    disabled={disableInfo}
                >
                    {disableInfo ? (
                        <ThreeDots
                            margin-bottom="20px"
                            height="30"
                            width="60"
                            radius="12"
                            color="#FFFFFF"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                    ) : (
                        "Entrar"
                    )}
                </button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
