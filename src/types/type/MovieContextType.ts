import { UseMovieReturn } from "./UseMovieReturn";
import { FilterState } from "../../hooks/useQueryFilter";

export type MovieContextType = UseMovieReturn &{
    queryFilter: FilterState,
    search: string,
    setSearch: (value: React.SetStateAction<string>) => void,
    manageQuery: (filterType: 'status' | 'year' | 'rating', value: string) => void,
    removeFilter: (filterType: 'status' | 'year' | 'rating') => void,
    clearAllFilters: () => void
}