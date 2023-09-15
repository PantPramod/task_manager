import React, {
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect
} from 'react'

type propTypes = {
  children: ReactNode
}
type ContextType = {
  email: string 
  setEmail: Dispatch<SetStateAction<string>>
}
export const GlobalContext = React.createContext<ContextType>({
  email: '',
  setEmail: () => { }
})

export const useAuth = () => {
  return useContext(GlobalContext)
}

const GlobalContextProvider = ({ children }: propTypes) => {
  const [email, setEmail] = useState(sessionStorage.getItem("email")??"")

  const data = {
    email,
    setEmail
  }

  useEffect(() => {
   sessionStorage.setItem('email', email?email:"")
  }, [email])

  return (
    <GlobalContext.Provider value={data}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider
