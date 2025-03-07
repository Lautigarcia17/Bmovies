import { lazy } from "react";

export const MovieListPage = lazy(() => import("./pages/MovieListPage/MovieListPage"));
export const MoviePage = lazy(() => import("./pages/MoviePage/MoviePage"));
export const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage"));
export const NotFoundPage = lazy(() => import("./pages/NotFound/NotFound"));