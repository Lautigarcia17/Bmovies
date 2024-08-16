import { useEffect, useState } from "react";
import { Movie } from "../types/interface";
import { detectChanges, getMovieById, removeDetectChanges } from "../services/database";
import { UseMovieByIdReturn } from "../types/type/UseMovieById";

export const useMovieById = ( idMovie : string) : UseMovieByIdReturn=>{
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [processCompleted, setProcessCompleted] = useState<boolean>(false);

    useEffect(() => {

        const findMovie = async () =>{
            if (idMovie) {
                setLoading(true)
           
                try {
                    const { data, error } = await getMovieById(idMovie);
 
                    if (data && !error) {
                        setMovie(data[0]);
                    } 
                } catch(error) {
                    console.log(error);
                } finally{
                    setLoading(false);
                    setProcessCompleted(true);
                }
            }
        }
        
        findMovie();

        const subscription = detectChanges(findMovie);

        return () => {
            removeDetectChanges(subscription);
        }

    }, [])


    return {movie,loading,processCompleted}
} 