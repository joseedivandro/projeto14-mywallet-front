import axios from "axios";


export default async function sendLogin (e,userEmail, userPassword, setDislableInfo, setUserInfo, setUserTransactions){
    e.preventDefault()
    setDislableInfo(true)
    setUserInfo({})
    setUserTransactions([])


    try{

        const signInResponse = await axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, {
            email: userEmail,
            password: userPassword
        })

    }catch{

    }


    

}