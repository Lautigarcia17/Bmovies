import { createContext, ReactNode, useRef } from "react";
import { ScrollContextType } from "../types/type/ScrollContextType";

export const scrollContext = createContext<ScrollContextType | undefined>(undefined);

export default function ScrollProvider({children} : {children:ReactNode}){
    const scrollRef = useRef<HTMLDivElement >(null);

    return(
        <scrollContext.Provider value={{scrollRef }}>
            {children}
        </scrollContext.Provider>
    )
}