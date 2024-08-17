import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const authContext = createContext<any>({});

export default function AuthProvider({children} : any){
    const {session, loadingSession, signIn, signUp, signOut,register, handleSubmit, errors } = useAuth();


    return(
        <authContext.Provider value={{session, loadingSession, signIn, signUp, signOut, register, handleSubmit, errors }}>
            {children}
        </authContext.Provider>
    )
}