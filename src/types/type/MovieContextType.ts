import { UseMovieReturn } from "./UseMovieReturn";

export type MovieContextType = UseMovieReturn & {
    queryFilter: string,
    setSearch: (value: React.SetStateAction<string>) => void,
    manageQuery: (query : string) => void
}