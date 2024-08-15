import { useState } from "react";
import { UseRatingReturn } from "../types/type";
import { validateRange } from "../utilities/validateNumberRange";

export const useRating = () : UseRatingReturn =>{
    const [rating, setRating] = useState<number | null>(null);


    const setRatingFromValue = (value : string | null) => { 
        
        if(value && value != null){
            setRating(parseFloat(value));
        }
        else{
            setRating(null);
        }
    }

    const handleValidationRating = (e: React.FocusEvent<HTMLInputElement>)=>{
        if (e.target.value !== '') {
          const value = validateRange(parseFloat(e.target.value))
          setRating(value);
          e.target.value = value.toString()
        }
      }

    return {rating,setRatingFromValue,handleValidationRating}
}

