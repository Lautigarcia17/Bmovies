 export const roundToNearestHalf = (num: number) => {
    return Math.round(num * 2) / 2;
};

export const validateRange = (number : number) => {
    if (number != null) {
        let value = number;

        if (value < 1 || isNaN(value)) {
            value = 1;
        } else if (value > 10) {
            value = 10
        }

        return roundToNearestHalf(value);
    }
    return number;
}