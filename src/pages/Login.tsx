import axios from "axios";
import { FormEvent, useReducer } from "react";
import { Link, useNavigate } from "react-router";
import { getUser } from "../services/user.services";
import { useAtom } from "jotai";
import { userAtom } from "../atoms";

type State = {
    email: string
    password: string
    loading: boolean
    error: string
}

const initialState: State = {
    email: "",
    password: "",
    loading: false,
    error: ""
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const reducer = (state: State, action: any) => {
    switch (action.type) {
        case "UPDATE_FIELD":
            return {
                ...state,
                [action.field]: action.value
            };
        default:
            return state;
    }
}

const Login = () => {
    const [data, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate()
    const [_, setUser] = useAtom(userAtom)

    const dataHandler = (field: string, value: any) => {
        dispatch({ type: "UPDATE_FIELD", field, value });
    };

    const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!emailRegex.test(data.email) || data.password.length < 8)
            dataHandler("loading", true)
        try {
            const payload = { email: data.email, password: data.password }
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, payload)
            localStorage.setItem("token", res.data.token)
            setUser(res.data.user)
            navigate("/")
        }
        catch (error: any) {
            dataHandler("error", error.response.data.message)
            setTimeout(() => dataHandler("error", ""), 3000)
        }
        finally {
            dataHandler("loading", false)
        }
    }

    return (
        <form className="flex flex-col gap-4 bg-white p-8 rounded-lg items-center min-w-96" onSubmit={loginHandler}>
            <h1 className="text-2xl font-bold">Treasure Tussle</h1>
            <h2 className="text-xl font-semibold">Login To Your Account</h2>
            <div className="flex flex-col gap-2 w-full items-center mt-4">
                <label className="text-md" htmlFor="email">Email Address</label>
                <input
                    className="w-full p-3 rounded-md outline-none border-indigo-300 border"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={e => dataHandler("email", e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2 w-full items-center">
                <label className="text-md" htmlFor="password">Password</label>
                <input
                    className="w-full p-3 rounded-md outline-none border-indigo-300 border"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={e => dataHandler("password", e.target.value)}
                />
                <Link to={"/auth/login"} className="mt-2 text-[#5926f0] underline text-sm">Forgot Password?</Link>
            </div>
            {
                data.error
                &&
                <span className="text-red-600 font-semibold mt-2">{data.error}</span>
            }
            <button
                className="p-3 bg-[#5926f0] w-full mt-4 rounded-md text-lg text-white font-semibold disabled:opacity-75"
                disabled={!emailRegex.test(data.email) || data.password.length < 8 || data.loading}
            >Login</button>
            <p className="text-sm mt-4">Don't have an account?  <Link to={"/auth/signup"} className="text-[#5926f0] underline">Signup Now</Link></p>
        </form>
    )
}

export default Login