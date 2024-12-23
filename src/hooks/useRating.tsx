import { useState } from "react";
import { UseRatingReturn } from "../types/type";
import { validateRange } from "../utilities/validateNumberRange";

export const useRating = (value : number | null = null) : UseRatingReturn =>{
    const [rating, setRating] = useState<number | null>(value);

    const setRatingFromValue = (value: string | null) => {
        if (value) {
          const parsedValue = parseInt(value.replace(/[^0-9]/g, '')); 
          if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
            setRating(parsedValue);
          } else {
            setRating(null); 
          }
        } else {
          setRating(null);
        }
      };

    const handleValidationRating = (e: React.FocusEvent<HTMLInputElement>)=>{
        if (e.target.value !== '') {
          const value = validateRange(parseInt(e.target.value))
          setRating(value);
          e.target.value = value.toString()
        }
      }

    return {rating,setRatingFromValue,handleValidationRating}
}

