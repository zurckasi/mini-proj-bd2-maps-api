import React, {createContext, useState} from 'react'

export const AuthContext = createContext({})

function AuthProvider ({children}) {
    const [ user, setUser ] = useState({})
    function setUserContext(name, mail){
        setUser({
            name,
            mail
        })
    }
    return(
        <AuthContext.Provider value={{user, setUserContext}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider