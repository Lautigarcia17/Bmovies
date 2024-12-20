import { createContext, ReactNode } from "react";

import { UseAuthReturn } from "../types/type";
import { useAuth } from "../hooks/useAuth";


export const authContext = createContext<UseAuthReturn | undefined>(undefined);

export default function AuthProvider({children} : {children:ReactNode}){
    const {idSession,userData, loadingSession, signIn, signUp, signOut,register, handleSubmit, errors } = useAuth();


    return(
        <authContext.Provider value={{idSession,userData, loadingSession, signIn, signUp, signOut, register, handleSubmit, errors }}>
            {children}
        </authContext.Provider>
    )
}