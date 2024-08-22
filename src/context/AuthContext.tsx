import { createContext, ReactNode } from "react";

import { UseAuthReturn } from "../types/type";
import { useAuth } from "../hooks/useAuth";


export const authContext = createContext<UseAuthReturn | undefined>(undefined);

export default function AuthProvider({children} : {children:ReactNode}){
    const {session, loadingSession, signIn, signUp, signOut,register, handleSubmit, errors } = useAuth();


    return(
        <authContext.Provider value={{session, loadingSession, signIn, signUp, signOut, register, handleSubmit, errors }}>
            {children}
        </authContext.Provider>
    )
}