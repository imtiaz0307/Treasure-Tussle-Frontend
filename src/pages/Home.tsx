import { useNavigate } from "react-router"

const Home = () => {
    const navigate = useNavigate()

    const logoutHandler = () => {
        localStorage.removeItem("token")
        navigate("/auth/login")
    }
    return (
        <button onClick={logoutHandler}>Logout</button>
    )
}

export default Home