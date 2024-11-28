import { createContext, ReactNode, useRef, useState } from "react";
import { ScrollContextType } from "../types/type/ScrollContextType";

export const scrollContext = createContext<ScrollContextType | undefined>(undefined);

export default function ScrollProvider({children} : {children:ReactNode}){
    const scrollRef = useRef<HTMLDivElement >(null);
    const [scrollPosition,setScrollPosition] = useState<number>(0);

    return(
        <scrollContext.Provider value={{scrollRef,scrollPosition,setScrollPosition }}>
            {children}
        </scrollContext.Provider>
    )
}