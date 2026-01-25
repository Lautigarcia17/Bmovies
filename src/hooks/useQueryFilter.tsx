import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UseQueryFilter } from "../types/type";

export interface FilterState {
    status?: string;
    year?: string;
    rating?: string;
}

export const useQueryFilter = (_idSession:string) : UseQueryFilter =>{

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
    const isInitialMount = useRef(true);

    const manageQuery = useCallback((filterType: 'status' | 'year' | 'rating', value: string) => {
        const newFilter = { ...queryFilter };
        
        if (filterType === 'status' && value === 'all') {
            delete newFilter.status;
        } else {
            newFilter[filterType] = value;
        }
        
        setQueryFilter(newFilter);
        navigate(`?filter=${encodeURIComponent(JSON.stringify(newFilter))}`);
    }, [queryFilter, navigate]);

    const removeFilter = useCallback((filterType: 'status' | 'year' | 'rating') => {
        const newFilter = { ...queryFilter };
        delete newFilter[filterType];
        setQueryFilter(newFilter);
        navigate(`?filter=${encodeURIComponent(JSON.stringify(newFilter))}`);
    }, [queryFilter, navigate]);

    const clearAllFilters = useCallback(() => {
        setQueryFilter({});
        navigate(`?filter=${encodeURIComponent(JSON.stringify({}))}`);
    }, [navigate]);

    useEffect(()=> {     
       if(isInitialMount.current && location.pathname === '/' && initialFilterParam === '{}'){
        isInitialMount.current = false;
        const defaultFilter = {};
        navigate(`?filter=${encodeURIComponent(JSON.stringify(defaultFilter))}`, { replace: true });
        setQueryFilter(defaultFilter);
       }
    },[]);

    return {queryFilter, manageQuery, removeFilter, clearAllFilters}
}

