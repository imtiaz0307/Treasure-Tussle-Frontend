import { useNavigate } from "react-router"

const Home = () => {
    const navigate = useNavigate()

    const logoutHandler = () => {
        localStorage.removeItem("token")
        navigate("/auth/login")
    }
    return (
        <div className="h-80 w-80">
            <button className="text-white" onClick={logoutHandler}>Logout</button>
        </div>
    )
}

export default Home