import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UseQueryFilter } from "../types/type";


export const useQueryFilter = (session:string, defaultFilter:string = 'all') : UseQueryFilter =>{

    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialFilter = queryParams.get('filter') || ''

    const [queryFilter,setQueryFilter] = useState<string>(initialFilter);

    const manageQuery = (query :string)=>{
        setQueryFilter(query);
        navigate(`?filter=${query}`)
    }

    useEffect(()=>{     
       if(session && location.pathname == '/' && initialFilter == ''){
        navigate(`?filter=${defaultFilter}`)
        setQueryFilter(defaultFilter);
       }
        
    },[session,location.search])

    return {queryFilter,manageQuery}
}

