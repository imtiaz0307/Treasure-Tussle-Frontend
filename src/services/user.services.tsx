import axios from "axios"

const getUser = async (token: string) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/${token}`)
        return res.data.user
    } catch (error: any) {
        console.log(error.response.data.data)
        return null;
    }
}

export {
    getUser
}