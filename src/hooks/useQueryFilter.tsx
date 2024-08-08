import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useQueryFilter = (defaultFilter = 'all') =>{

    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialFilter = queryParams.get('filter') || ''

    const [queryFilter,setQueryFilter] = useState<string>(initialFilter);

    const handleQuery = (query :string)=>{
        setQueryFilter(query);
        navigate(`?filter=${query}`)
    }

    useEffect(()=>{
       if(initialFilter == ''){
        navigate(`?filter=${defaultFilter}`)
        setQueryFilter(defaultFilter);
       }
        
    },[])

    return {queryFilter,handleQuery}
}

export default useQueryFilter