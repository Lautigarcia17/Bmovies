import { createContext, useState } from "react";
import { useMovie } from "../hooks/useMovie";
import { useQueryFilter } from "../hooks/useQueryFilter";
import { authContext } from "./AuthContext";
import { useGenericContext } from "../hooks/useGenericContext";
import { MovieContextType } from "../types/type";

export const movieContext = createContext<MovieContextType | undefined>(undefined);

export default function MovieProvider({children} : any){
    const [search, setSearch] = useState<string>('');
    const {idSession} = useGenericContext(authContext)
    const {queryFilter, manageQuery} = useQueryFilter(idSession ?? '');

    const {listMovies,movieToDisplay,loading,saveMovie,removeMovie,modifyMovie} = useMovie(idSession ?? '',search,queryFilter,manageQuery);
    return(
        <movieContext.Provider value={{listMovies,movieToDisplay,loading,saveMovie,removeMovie,modifyMovie,queryFilter, search,setSearch,manageQuery}}>
            {children}
        </movieContext.Provider>
    )
}