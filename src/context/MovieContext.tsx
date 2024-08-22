import { createContext, useState } from "react";
import { useMovie } from "../hooks/useMovie";
import { useQueryFilter } from "../hooks/useQueryFilter";
import { authContext } from "./AuthContext";
import { useGenericContext } from "../hooks/useGenericContext";

export const movieContext = createContext<any>({});

export default function MovieProvider({children} : any){
    const [search, setSearch] = useState<string>('');
    const {session} = useGenericContext(authContext)
    const {queryFilter, manageQuery} = useQueryFilter(session ?? '');

    const {listMovies,movieToDisplay,loading,saveMovie,removeMovie,modifyMovie} = useMovie(session ?? '',search,queryFilter);
    return(
        <movieContext.Provider value={{listMovies,movieToDisplay,loading,saveMovie,removeMovie,modifyMovie,queryFilter,setSearch,manageQuery}}>
            {children}
        </movieContext.Provider>
    )
}