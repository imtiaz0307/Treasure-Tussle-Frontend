import axios from "axios";
import { FormEvent, useReducer } from "react";
import { Link, useNavigate } from "react-router";
import { useAtom } from "jotai";
import { userAtom } from "../atoms";
import logo from "../assets/images/logo-trs.webp"
import Loader from "../components/Loader";

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
        dataHandler("loading", true)
        dataHandler("error", "")
        if (!emailRegex.test(data.email) || data.password.length < 8) return;
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
        <form className="flex flex-col gap-4 bg-[#ffffffbd] backdrop-blur-lg sm:p-8 p-6 rounded-lg items-center w-full max-w-md" onSubmit={loginHandler}>
            <img
                src={logo}
                alt="Teasure Tussle"
                className="w-40 h-40 aspect-square"
            />
            <h2 className="text-lg sm:text-xl font-semibold text-slate-600">Login To Your Account</h2>
            <div className="flex flex-col gap-2 w-full items-center mt-4">
                <label className="sm:text-md text-sm text-slate-600 font-semibold" htmlFor="email">Email Address</label>
                <input
                    className="w-full p-3 rounded-md outline-none border-emerald-200 border"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={data.email}
                    onChange={e => dataHandler("email", e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2 w-full items-center">
                <label className="sm:text-md text-sm text-slate-600 font-semibold" htmlFor="password">Password</label>
                <input
                    className="w-full p-3 rounded-md outline-none border-emerald-200 border"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={data.password}
                    onChange={e => dataHandler("password", e.target.value)}
                />
                <Link to={"/auth/login"} className="mt-2 text-emerald-600 underline text-xs sm:text-sm">Forgot Password?</Link>
            </div>
            {
                data.error
                &&
                <span className="text-red-600 font-semibold mt-2">{data.error}</span>
            }
            <button
                className="p-3 bg-emerald-gradient w-full mt-4 rounded-md sm:text-lg text-sm  text-white font-semibold disabled:opacity-75"
                disabled={!emailRegex.test(data.email) || data.password.length < 8 || data.loading}
            >
                {
                    data.loading
                    &&
                    <Loader />
                }
                Login
            </button>
            <p className="text-xs sm:text-sm mt-4 text-slate-600">Don't have an account?  <Link to={"/auth/signup"} className="text-emerald-600 underline">Signup Now</Link></p>
        </form>
    )
}

export default Login