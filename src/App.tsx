import { useEffect, useMemo } from "react"
import Router from "./routes"
import { io } from "socket.io-client"

const App = () => {
  const socket = useMemo(() => io(import.meta.env.VITE_API_BASE_URL), [])

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id)
    })
  }, [])
  return (
    <Router />
  )
}

export default App