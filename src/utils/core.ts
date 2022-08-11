export const redirect = (path: string): void => {
    window.location.pathname = path;
};

export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const addCommasToNumbers = (num: number): string => {
    return num.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};