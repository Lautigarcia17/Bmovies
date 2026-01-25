import { FilterState } from "../../hooks/useQueryFilter";

export type UseQueryFilter = {
    queryFilter: FilterState,
    manageQuery: (filterType: 'status' | 'year' | 'rating', value: string) => void,
    removeFilter: (filterType: 'status' | 'year' | 'rating') => void,
    clearAllFilters: () => void
}