/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import { Movie } from "../types/interface";
import { sortNameByMonth } from "../utilities/sortNameByMonth";
import { UseStatistics } from "../types/type/UseStatistics";



export const useStatistics = (listMovies : Movie[]) : UseStatistics =>{

    const moviesWatched = useMemo(() => 
        listMovies.filter(movie => movie.rating !== null).length
    , [listMovies]);

    const moviesToWatch = useMemo(() => 
        listMovies.length - moviesWatched
    , [listMovies.length, moviesWatched]);

    const moviesPerYear = useMemo(() => {
        const result = listMovies.reduce((acc : Record<number, number>, item : Movie )=>{
            if (item.rating !== null) {
                const year = item.created_at?.getFullYear() ?? 0;
                acc[year] = (acc[year] || 0) + 1;
            }
            return acc
        },{});

        return result !== null 
            ? Object.entries(result).sort(([yearA],[yearB])=> Number(yearB) - Number(yearA))
            : [];
    }, [listMovies]);

    const moviesByGenre = useMemo(() => {
        const result = listMovies.reduce((acc : Record<string, number>, item : Movie )=>{
            if (item.rating !== null) {
                
                const arrayGenre : Array<string>  = item.genre?.split(",").map((genre : string)=> genre.trim()) ?? [] ;
                arrayGenre.forEach((genre)=>{
                    acc[genre] = (acc[genre] || 0) + 1;
                })
                
            }
            return acc
        },{});
        
        return Object.fromEntries(
            Object.entries(result).sort(([, valueA], [, valueB]) => valueB - valueA)
        );
    }, [listMovies]);

    const moviesByRating = useMemo(() => {
        const result = listMovies.reduce((acc : Record<number, number>, item : Movie )=>{
 
            if (item.rating !== null) {
                const rating : number = item.rating ?? 0;
                acc[rating] = (acc[rating] || 0) + 1;
            }
            
            return acc
        },{});

        return Object.entries(result).map(([rating, count]) => ({ rating: Number(rating), count })).sort((a, b) => b.rating - a.rating);
    }, [listMovies]);

    const moviesByDecade = useMemo(() => {
        if (listMovies.length > 0) {
            const resultOrder : Movie[] = [...listMovies].sort((a : any ,b : any)=> b.year  - a.year); 
            
            return resultOrder.reduce((acc : Record<string, number>, item : Movie) =>{
                if (item.year !== null) {
                    
                    const decadeMovie = Math.floor(item.year / 10) * 10;
                    const decade = `${decadeMovie}-${decadeMovie + 9}`;

                    acc[decade] = (acc[decade] || 0) + 1;
                }
                

                return acc;
            },{});
        }
        return {};
    }, [listMovies]);

    const { moviesByMonth, currentYearOfMonth } = useMemo(() => {
        if (listMovies.length > 0) {
            const currentDate = new Date();
            const currentYear = listMovies.some( (movie : Movie) => movie.created_at?.getFullYear() === currentDate.getFullYear() && movie.rating !== null) 
                                ? currentDate.getFullYear() 
                                : currentDate.getFullYear() - 1;

            const result = listMovies.reduce( (acc : Record<string, number>, item : Movie) =>{

                if (currentYear === item.created_at?.getFullYear()) {
                    const month = item.created_at.toLocaleString('en-US', {month: 'long'});
                    acc[month] = (acc[month] || 0) + 1; 
                }
                return acc
            },{})
            
            const sortedResult = sortNameByMonth(result);
            return { moviesByMonth: sortedResult, currentYearOfMonth: currentYear };
        }
        return { moviesByMonth: {}, currentYearOfMonth: undefined };
    }, [listMovies]);

    return {moviesWatched, moviesToWatch, moviesPerYear, moviesByGenre, moviesByRating, moviesByDecade, moviesByMonth, currentYearOfMonth};
}