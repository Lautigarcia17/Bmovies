/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Movie } from "../types/interface";
import { sortNameByMonth } from "../utilities/sortNameByMonth";
import { UseStatistics } from "../types/type/UseStatistics";



export const useStatistics = (listMovies : Movie[]) : UseStatistics =>{

    const [moviesWatched, setMoviesWatched] = useState<number>(0);
    const [moviesToWatch, setMoviesToWatch] = useState<number>(0);
    const [moviesPerYear, setMoviesPerYear] = useState<[string,number][]>([]);
    const [moviesByGenre, setMoviesByGenre] = useState<Record<string, number>>({});
    const [moviesByRating, setMoviesByRating] = useState<{rating: number; count: number}[]>([]);
    const [moviesByDecade, setMoviesByDecade] = useState<Record<string, number>>({});
    const [moviesByMonth, setMoviesByMonth] = useState<Record<string, number>>({});
    const [currentYearOfMonth, setCurrentYearOfMonth] = useState<number | undefined>();

    const calculateMoviesCount = ()=>{
        if(listMovies.length > 0){
            const watched = listMovies.filter(movie => movie.rating !== null).length;
            const toWatch = listMovies.length - watched;

            setMoviesToWatch(toWatch);
            setMoviesWatched(watched);
        }
    }

    
    const calculateMoviesPerYear = ()=>{
        const result = listMovies.reduce((acc : Record<number, number>, item : Movie )=>{
            if (item.rating !== null) {
                const year = item.created_at?.getFullYear() ?? 0;
                acc[year] = (acc[year] || 0) + 1;
            }
            
            return acc
        },{});

        const moviesPerYear = result !== null 
                                ? Object.entries(result).sort(([yearA],[yearB])=> Number(yearB) - Number(yearA))
                                : result

        setMoviesPerYear(moviesPerYear);
    }

    const calculateMoviesByGenre = ()=>{
        const result = listMovies.reduce((acc : Record<string, number>, item : Movie )=>{
            if (item.rating !== null) {
                
                const arrayGenre : Array<string>  = item.genre?.split(",").map((genre : string)=> genre.trim()) ?? [] ;
                arrayGenre.forEach((genre)=>{
                    acc[genre] = (acc[genre] || 0) + 1;
                })
                
            }
            return acc
        },{});
        
        const sorteredGenre = Object.fromEntries(
            Object.entries(result).sort(([, valueA], [, valueB]) => valueB - valueA)
        );

        setMoviesByGenre(sorteredGenre);
    }

    
    const calculateMoviesByRating = ()=>{
        const result = listMovies.reduce((acc : Record<number, number>, item : Movie )=>{
 
            if (item.rating !== null) {
                const rating : number = item.rating ?? 0;
                acc[rating] = (acc[rating] || 0) + 1;
            }
            
            return acc
        },{});

        const sortedResult = Object.entries(result).map(([rating, count]) => ({ rating: Number(rating), count })).sort((a, b) => b.rating - a.rating);
        setMoviesByRating(sortedResult);
    }

    const calculateMoviesByDecade = ()=>{
        if (listMovies.length > 0) {
            const resultOrder : Movie[] = [...listMovies].sort((a : any ,b : any)=> b.year  - a.year); 
            
            const result = resultOrder.reduce((acc : Record<string, number>, item : Movie) =>{
                if (item.year !== null) {
                    
                    const decadeMovie = Math.floor(item.year / 10) * 10;
                    const decade = `${decadeMovie}-${decadeMovie + 9}`;

                    acc[decade] = (acc[decade] || 0) + 1;
                }
                

                return acc;
            },{});
            setMoviesByDecade(result);
        }
    }

    const calculateMoviesByMonth = ()=>{
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
            setCurrentYearOfMonth(currentYear);
            setMoviesByMonth(sortedResult);
        }
    }


    useEffect(() => {
        calculateMoviesCount();
        calculateMoviesPerYear();
        calculateMoviesByGenre();
        calculateMoviesByRating();
        calculateMoviesByDecade();
        calculateMoviesByMonth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listMovies])

    return {moviesWatched, moviesToWatch, moviesPerYear, moviesByGenre, moviesByRating, moviesByDecade, moviesByMonth, currentYearOfMonth};
}