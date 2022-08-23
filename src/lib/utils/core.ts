export const redirect = (path: string): void => {
    window.location.pathname = path;
};

export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const addCommasToNumbers = (num: number): string => {
    return num.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseFormData = (form: any): any => {
    const formData = new FormData(form);

    const data: {
        [key: string]: any;
    } = {};

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const [ key, value ] of formData) {
        data[key] = value;
    };

    return data;
};