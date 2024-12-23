export const sortNameByMonth = (list : Record<string, number>) : Record<string, number> => {
    const monthOrder = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 
        'August', 'September', 'October', 'November', 'December'
    ];


    const sortedResult = monthOrder.reduce((acc : Record<string, number>, month : string) => {
        if (list[month] !== undefined) {
            acc[month] = list[month];
        }
        return acc;
    }, {});

    return sortedResult;
}