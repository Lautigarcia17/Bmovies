import { createContext, useState } from "react";
import { useMovie } from "../hooks/useMovie";
import { useQueryFilter } from "../hooks/useQueryFilter";

export const movieContext = createContext<any>({});

export default function MovieProvider({children} : any){
    const [search, setSearch] = useState<string>('');
    const {queryFilter, manageQuery} = useQueryFilter();

    const {listMovies,movieToDisplay,loading,saveMovie,removeMovie,modifyMovie} = useMovie(search,queryFilter);
    return(
        <movieContext.Provider value={{listMovies,movieToDisplay,loading,saveMovie,removeMovie,modifyMovie,queryFilter,setSearch,manageQuery}}>
            {children}
        </movieContext.Provider>
    )
}