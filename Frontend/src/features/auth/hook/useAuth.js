import { getMe, login, register } from "../service/auth.api";
import { useDispatch } from 'react-redux'
import { setUser, setLoading, setError } from "../state/auth.slice";


export const useAuth = () => {

    const dispatch = useDispatch()

    async function handleRegister({ fullname, email, contact, password, isSeller }){
        const data = await register({ fullname, email, contact, password, isSeller })
        dispatch(setUser(data.user))
        return data.user
    }


    async function handleLogin({ email, password }){
        const data = await login({ email, password })
        dispatch(setUser(data.user))
        return data.user
    }


    async function handleGetMe(){
        
        try {

            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))

        } catch (err) {
            console.log(err)
        } finally {
            dispatch(setLoading(false))
        }

    }

    return { handleRegister, handleLogin, handleGetMe }
}