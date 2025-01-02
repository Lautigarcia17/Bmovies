import { useEffect } from "react";

export const useEnterClick = (ref: React.RefObject<HTMLDivElement>) =>{
    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
          if (event.key === "Enter") {
            event.preventDefault();
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