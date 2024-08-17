import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const authContext = createContext<any>({});

export default function AuthProvider({children} : any){
    const {session, signIn, signUp, signOut,register, handleSubmit, errors } = useAuth();

    return(
        <authContext.Provider value={{session,signIn, signUp, signOut, register, handleSubmit, errors }}>
            {children}
        </authContext.Provider>
    )
}