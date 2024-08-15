export type UseRatingReturn = {
    rating: number | null,
    setRatingFromValue: (value: string | null) => void,
    handleValidationRating: (e: React.FocusEvent<HTMLInputElement>)=> void
}