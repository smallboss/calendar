
export const sortArrayByKey = (array, key) => {
    return array.sort(function(a, b) {
        let x = a[key];
        let y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
};