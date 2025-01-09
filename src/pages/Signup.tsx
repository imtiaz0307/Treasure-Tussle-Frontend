import axios from "axios";
import { FormEvent, useMemo, useReducer } from "react";
import { Link, useNavigate } from "react-router";
import countries from "../data/countries.json"
import { Check, X } from "react-feather";
import logo from "../assets/images/logo-trs.webp"

type State = {
    name: string
    username: string
    email: string
    password: string
    confirm_password: string
    country: string
    loading: boolean
    error: string
    step: number
    verified: boolean
}

const initialState: State = {
    name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    country: "",
    loading: false,
    error: "",
    step: 1,
    verified: false
}

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = [
    { expression: /.{8,}/, label: "Must be at least 8 characters" },
    { expression: /[A-Z]/, label: "Including atleast one uppercase character" },
    { expression: /[a-z]/, label: "Including atleast one lowercase character" },
    { expression: /\d/, label: "Including atleast one digit/number" },
    { expression: /[!@#$%^&*(),.?":{}|<>]/, label: "Including atleast one special character" },
]

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

const Signup = () => {
    const [data, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate()

    const dataHandler = (field: string, value: any) => {
        dispatch({ type: "UPDATE_FIELD", field, value });
    };

    const signupHandler = async () => {
        dataHandler("loading", true)
        try {
            const payload = {
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password,
                country: data.country
            }
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, payload)
            console.log(res.data)
            navigate("/auth/login")
        }
        catch (error: any) {
            console.log(error)
            dataHandler("error", error.response.data.message)
            setTimeout(() => dataHandler("error", ""), 3000)
        }
        finally {
            dataHandler("loading", false)
        }
    }

    const disabledButton = useMemo(() => {
        switch (data.step) {
            case 1:
                return !data.name || !data.username || data.name.length < 4 || data.username.length < 3
            case 2:
                return !data.country || !emailRegex.test(data.email)
            case 3:
                return !passwordRegex.every(i => i.expression.test(data.password)) || data.password !== data.confirm_password
            default:
                return false;
        }
    }, [data.step, data.name, data.username, data.country, data.email, data.password, data.confirm_password])

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (disabledButton) return;
        switch (data.step) {
            case 1:
                dataHandler("step", 2)
                break;
            case 2:
                dataHandler("step", 3)
                break;
            case 3:
                signupHandler()
                break;

            default:
                break;
        }
    }

    return (
        <form className="flex flex-col gap-4 bg-[#ffffffbd] backdrop-blur-lg sm:p-8 p-6 rounded-lg items-center w-full max-w-md transition-all" onSubmit={onSubmitHandler}>
            {/* <h1 className="sm:text-2xl text-xl font-bold">Treasure Tussle</h1> */}
            <img
                src={logo}
                alt="Teasure Tussle"
                className="w-40 h-40 aspect-square"
            />
            <h2 className="text-lg sm:text-xl font-semibold text-slate-600">Start Your Journey Today</h2>
            {
                data.step === 1
                &&
                <>
                    <div className="flex flex-col gap-2 w-full items-center mt-4">
                        <label className="text-sm sm:text-md text-slate-600 font-semibold" htmlFor="name">Full Name</label>
                        <input
                            className="w-full p-3 rounded-md outline-none border-emerald-200 border"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your fullname"
                            value={data.name}
                            onChange={e => dataHandler("name", e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full items-center">
                        <label className="text-sm sm:text-md text-slate-600 font-semibold" htmlFor="username">Username</label>
                        <input
                            className="w-full p-3 rounded-md outline-none border-emerald-200 border"
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Enter your username"
                            value={data.username}
                            onChange={e => dataHandler("username", e.target.value.toLowerCase())}
                        />
                    </div>
                </>
            }
            {
                data.step === 2
                &&
                <>
                    <div className="flex flex-col gap-2 w-full items-center mt-4">
                        <label className="text-sm sm:text-md text-slate-600 font-semibold" htmlFor="email">Email Address</label>
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
                        <label className="text-sm sm:text-md text-slate-600 font-semibold" htmlFor="country">Country</label>
                        <select
                            className="w-full p-3 rounded-md outline-none border-emerald-200 border"
                            name="country"
                            id="country"
                            value={data.country}
                            onChange={e => dataHandler("country", e.target.value)}
                        >
                            <option value="" disabled>--Select-Your-Country--</option>
                            {
                                countries.map(country => (
                                    <option value={country.alpha3} key={country.alpha3}>{country.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </>
            }
            {
                data.step === 3
                &&
                <>
                    <div className="flex flex-col gap-2 w-full items-center mt-4">
                        <label className="text-sm sm:text-md text-slate-600 font-semibold" htmlFor="password">Password</label>
                        <input
                            className="w-full p-3 rounded-md outline-none border-emerald-200 border"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            value={data.password}
                            onChange={e => dataHandler("password", e.target.value)}
                        />
                    </div>
                    <div
                        className="sm:p-6 p-4 bg-white rounded-lg flex flex-col gap-2 w-full"
                    >
                        {
                            passwordRegex.map(item => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-1"
                                >
                                    {
                                        item.expression.test(data.password)
                                            ?
                                            <div className="sm:h-4 h-3 bg-green-500 sm:w-4 w-3 flex items-center justify-center text-white rounded-full shrink-0"><Check size={12} /></div>
                                            :
                                            <div className="sm:h-4 h-3 bg-red-500 sm:w-4 w-3 flex items-center justify-center text-white rounded-full shrink-0"><X size={12} /></div>
                                    }
                                    <span className="sm:text-sm text-xs font-medium sm:whitespace-nowrap">{item.label}</span>
                                </div>
                            ))
                        }
                        <div
                            className="flex items-center gap-1"
                        >
                            {
                                data.password === data.confirm_password
                                    ?
                                    <div className="sm:h-4 h-3 bg-green-500 sm:w-4 w-3 flex items-center justify-center text-white rounded-full shrink-0"><Check size={12} /></div>
                                    :
                                    <div className="sm:h-4 h-3 bg-red-500 sm:w-4 w-3 flex items-center justify-center text-white rounded-full shrink-0"><X size={12} /></div>
                            }
                            <span className="sm:text-sm text-xs font-medium sm:whitespace-nowrap">Password and confirm password must be same</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full items-center">
                        <label className="text-sm sm:text-md text-slate-600 font-semibold" htmlFor="confirm_password">Confirm Password</label>
                        <input
                            className="w-full p-3 rounded-md outline-none border-emerald-200 border"
                            type="password"
                            name="confirm_password"
                            id="confirm_password"
                            placeholder="Enter your confirm_password"
                            value={data.confirm_password}
                            onChange={e => dataHandler("confirm_password", e.target.value)}
                        />
                    </div>
                </>
            }

            {
                data.error
                &&
                <span className="text-red-600 font-semibold mt-2">{data.error}</span>
            }
            <div className="flex gap-4 w-full">
                {
                    data.step > 1
                    &&
                    <button
                        className="p-3 bg-emerald-gradient w-full mt-4 rounded-md sm:text-lg text-sm text-white font-semibold disabled:opacity-75"
                        type="button"
                        disabled={data.loading}
                        onClick={() => dataHandler("step", data.step - 1)}
                    >Back</button>
                }
                <button
                    className="p-3 bg-emerald-gradient w-full mt-4 rounded-md sm:text-lg text-sm text-white font-semibold disabled:opacity-75 transition-all"
                    type="submit"
                    disabled={disabledButton || data.loading}
                >{data.step === 3 ? "Signup" : "Next"}</button>
            </div>
            <p className="text-xs sm:text-sm mt-4 text-slate-600">Already have an account?  <Link to={"/auth/login"} className="text-emerald-600 underline">Login Now</Link></p>
        </form>
    )
}

export default Signup