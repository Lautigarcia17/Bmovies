import axios from "axios";


const API_URL: string = 'http://www.omdbapi.com/?apikey=5b1461ac';


export const getMovieSearch = (value: string) => {
  return axios.get(API_URL + '&s=' + value);
}

export const getMovieId = (value: string) => {
  return axios.get(API_URL + '&i=' + value);
}

export const getFullMovie = (title: string, year: number | null) => {

  if (!year) {
    return axios.get(API_URL + '&t=' + title);
  }
  else {
    return axios.get(API_URL + '&t=' + title + '&y=' + year);
  }
}
