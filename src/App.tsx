import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignUp from './pages/SignUp'
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import { useAuth } from "./context/GlobalContextProvider"


const App = () => {
  const { email } = useAuth()

  return (
    <BrowserRouter>
      <Routes>

        <>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </>


        {email &&
          <Route path="/dashboard" element={<Dashboard />} />
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
