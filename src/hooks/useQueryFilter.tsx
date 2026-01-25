import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UseQueryFilter } from "../types/type";

export interface FilterState {
    status?: string;
    year?: string;
    rating?: string;
}

export const useQueryFilter = (idSession:string) : UseQueryFilter =>{

    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialFilterParam = queryParams.get('filter') || '{}';
    
    const parseFilter = (filterStr: string): FilterState => {
        try {
            return JSON.parse(filterStr);
        } catch {
            return {};
        }
    };

    const [queryFilter, setQueryFilter] = useState<FilterState>(parseFilter(initialFilterParam));

    const manageQuery = (filterType: 'status' | 'year' | 'rating', value: string) => {
        const newFilter = { ...queryFilter };
        
        if (filterType === 'status' && value === 'all') {
            delete newFilter.status;
        } else {
            newFilter[filterType] = value;
        }
        
        setQueryFilter(newFilter);
        navigate(`?filter=${encodeURIComponent(JSON.stringify(newFilter))}`);
    };

    const removeFilter = (filterType: 'status' | 'year' | 'rating') => {
        const newFilter = { ...queryFilter };
        delete newFilter[filterType];
        setQueryFilter(newFilter);
        navigate(`?filter=${encodeURIComponent(JSON.stringify(newFilter))}`);
    };

    const clearAllFilters = () => {
        setQueryFilter({});
        navigate(`?filter=${encodeURIComponent(JSON.stringify({}))}`);
    };

    useEffect(()=>{     
       if(location.pathname === '/' && initialFilterParam === '{}'){
        const defaultFilter = {};
        navigate(`?filter=${encodeURIComponent(JSON.stringify(defaultFilter))}`);
        setQueryFilter(defaultFilter);
       }
    },[idSession,navigate,location])

    return {queryFilter, manageQuery, removeFilter, clearAllFilters}
}

