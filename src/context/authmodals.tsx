import { createContext, useState } from "react";

export const AuthModalContext = createContext({})


const AuthModalProvider = (children: React.ReactNode) => {
    const [signup, setSignUp] = useState<boolean>(false)
    const [login, setLogIn] = useState<boolean>(false)

    const openLogin = () => {
        setLogIn(true)
    }

    const openSignUp = () => {
        setSignUp(true)
    }


  return <AuthModalContext.Provider value={{signup, login, openLogin, openSignUp}}>{children}</AuthModalContext.Provider>
}

export default AuthModalProvider