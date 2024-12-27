import { useEffect } from "react";

export const useEnterClick = (ref : any) =>{
    useEffect(() => {
        const handleKeydown = (event : any) => {
          if (event.key === "Enter") {
            const button = ref.current?.querySelector("input");
            if (button && !button.disabled) {
              button.click();
            }
          }
        };
    
        document.addEventListener("keydown", handleKeydown);
        return () => {
          document.removeEventListener("keydown", handleKeydown);
        };
      }, [ref]);



    
}