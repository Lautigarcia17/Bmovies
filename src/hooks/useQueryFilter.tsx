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

    const getInitialFilter = (): FilterState => {
        // Primero intentar obtener de la URL
        if (initialFilterParam !== '{}') {
            return parseFilter(initialFilterParam);
        }
        // Si no hay en URL, intentar recuperar de sessionStorage
        const savedFilter = sessionStorage.getItem('movieFilters');
        if (savedFilter) {
            return parseFilter(savedFilter);
        }
        return {};
    };

    const [queryFilter, setQueryFilter] = useState<FilterState>(getInitialFilter());
    const isInitialMount = useRef(true);

    const manageQuery = useCallback((filterType: 'status' | 'year' | 'rating', value: string) => {
        const newFilter = { ...queryFilter };
        
        if (filterType === 'status' && value === 'all') {
            delete newFilter.status;
        } else {
            newFilter[filterType] = value;
        }
        
        setQueryFilter(newFilter);
        
        // Only update URL if we're on a route that uses filters
        const routesWithFilters = ['/', '/details'];
        const shouldUseFilters = routesWithFilters.some(route => 
            location.pathname === route || location.pathname.startsWith('/details/')
        );
        
        if (shouldUseFilters) {
            navigate(`?filter=${encodeURIComponent(JSON.stringify(newFilter))}`);
        }
        sessionStorage.setItem('movieFilters', JSON.stringify(newFilter));
    }, [queryFilter, navigate, location.pathname]);

    const removeFilter = useCallback((filterType: 'status' | 'year' | 'rating') => {
        const newFilter = { ...queryFilter };
        delete newFilter[filterType];
        setQueryFilter(newFilter);
        
        // Only update URL if we're on a route that uses filters
        const routesWithFilters = ['/', '/details'];
        const shouldUseFilters = routesWithFilters.some(route => 
            location.pathname === route || location.pathname.startsWith('/details/')
        );
        
        if (shouldUseFilters) {
            navigate(`?filter=${encodeURIComponent(JSON.stringify(newFilter))}`);
        }
        sessionStorage.setItem('movieFilters', JSON.stringify(newFilter));
    }, [queryFilter, navigate, location.pathname]);

    const clearAllFilters = useCallback(() => {
        setQueryFilter({});
        
        // Only update URL if we're on a route that uses filters
        const routesWithFilters = ['/', '/details'];
        const shouldUseFilters = routesWithFilters.some(route => 
            location.pathname === route || location.pathname.startsWith('/details/')
        );
        
        if (shouldUseFilters) {
            navigate(`?filter=${encodeURIComponent(JSON.stringify({}))}`);
        }
        sessionStorage.setItem('movieFilters', JSON.stringify({}));
    }, [navigate, location.pathname]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            
            // Only add filter param on routes that need it (not on /auth, /profile/settings, etc.)
            const routesWithFilters = ['/', '/details'];
            const shouldUseFilters = routesWithFilters.some(route => 
                location.pathname === route || location.pathname.startsWith('/details/')
            );
            
            if (!shouldUseFilters) {
                // Clear filter from URL if we're on a route that doesn't need it
                if (location.search.includes('filter=')) {
                    navigate(location.pathname, { replace: true });
                }
                return;
            }
            
            const currentFilter = getInitialFilter();
            if (Object.keys(currentFilter).length > 0) {
                navigate(`?filter=${encodeURIComponent(JSON.stringify(currentFilter))}`, { replace: true });
            } else if (initialFilterParam === '{}') {
                const defaultFilter = {};
                navigate(`?filter=${encodeURIComponent(JSON.stringify(defaultFilter))}`, { replace: true });
                setQueryFilter(defaultFilter);
            }
        }
    },[]);

    return {queryFilter, manageQuery, removeFilter, clearAllFilters}
}

