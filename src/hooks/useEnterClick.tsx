import { useEffect } from "react";

export const useEnterClick = (ref: React.RefObject<HTMLButtonElement>) =>{
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if (ref.current && !ref.current.disabled) {
              ref.current.click();
            }
          }
        };
    
        document.addEventListener("keydown", handleKeydown);
        return () => {
          document.removeEventListener("keydown", handleKeydown);
        };
      }, [ref]);    
}