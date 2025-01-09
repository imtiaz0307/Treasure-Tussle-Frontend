import Router from "./routes"

const App = () => {
  return (
    <div className="min-h-screen w-full App">
      <div
        className="absolute inset-0 bg-black opacity-60"
      />
      <div className="relative z-10">
        <Router />
      </div>
    </div>
  )
}

export default App