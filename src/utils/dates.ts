export const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
export const monthLengths = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
];
export const times = [
    "00:15AM",
    "00:30AM",
    "00:45AM",
    "01:00AM",
    "01:15AM",
    "01:30AM",
    "01:45AM",
    "02:00AM",
    "02:15AM",
    "02:30AM",
    "02:45AM",
    "03:00AM",
    "03:15AM",
    "03:30AM",
    "03:45AM",
    "04:00AM",
    "04:15AM",
    "04:30AM",
    "04:45AM",
    "05:00AM",
    "05:15AM",
    "05:30AM",
    "05:45AM",
    "06:00AM",
    "06:15AM",
    "06:30AM",
    "06:45AM",
    "07:00AM",
    "07:15AM",
    "07:30AM",
    "07:45AM",
    "08:00AM",
    "08:15AM",
    "08:30AM",
    "08:45AM",
    "09:00AM",
    "09:15AM",
    "09:30AM",
    "09:45AM",
    "10:00AM",
    "10:15AM",
    "10:30AM",
    "10:45AM",
    "11:00AM",
    "11:15AM",
    "11:30AM",
    "11:45AM",
    "12:00PM",
    "12:15PM",
    "12:30PM",
    "12:45PM",
    "01:00PM",
    "01:15PM",
    "01:30PM",
    "01:45PM",
    "02:00PM",
    "02:15PM",
    "02:30PM",
    "02:45PM",
    "03:00PM",
    "03:15PM",
    "03:30PM",
    "03:45PM",
    "04:00PM",
    "04:15PM",
    "04:30PM",
    "04:45PM",
    "05:00PM",
    "05:15PM",
    "05:30PM",
    "05:45PM",
    "06:00PM",
    "06:15PM",
    "06:30PM",
    "06:45PM",
    "07:00PM",
    "07:15PM",
    "07:30PM",
    "07:45PM",
    "08:00PM",
    "08:15PM",
    "08:30PM",
    "08:45PM",
    "09:00PM",
    "09:15PM",
    "09:30PM",
    "09:45PM",
    "10:00PM",
    "10:15PM",
    "10:30PM",
    "10:45PM",
    "11:00PM",
    "11:15PM",
    "11:30PM",
    "11:45PM",
];
export const formatDate = (date: Date | number, format: string): string => {
    let formattedDate = format;
    date = new Date(date);

    const fullYear = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    formattedDate = formattedDate.replace("yyyy", fullYear.toString());
    formattedDate = formattedDate.replace("{MM}", month.toString().padStart(2, "0"));
    formattedDate = formattedDate.replace("{M}", month.toString());
    formattedDate = formattedDate.replace("dd", day.toString().padStart(2, "0"));
    formattedDate = formattedDate.replace("d", day.toString());
    if (formattedDate.includes("APM")) formattedDate = formattedDate.replace("hh", (hours > 12 ? hours - 12 : hours).toString());
    formattedDate = formattedDate.replace("hh", hours.toString().padStart(2, "0"));
    formattedDate = formattedDate.replace("mm", minutes.toString().padStart(2, "0"));
    formattedDate = formattedDate.replace("ss", seconds.toString().padStart(2, "0"));
    formattedDate = formattedDate.replace("ms", milliseconds.toString().padStart(3, "0"));
    formattedDate = formattedDate.replace("yy", fullYear.toString().substr(2, 2));
    formattedDate = formattedDate.replace("APM", hours >= 12 ? "pm" : "am");
    formattedDate = formattedDate.replace("MONTH", months[month - 1]);
    formattedDate = formattedDate.replace("WEEKDAY", daysOfWeek[date.getDay()]);

    let suffix = "th";
    
    if (day === 1 || day === 21 || day === 31) suffix = "st";
    else if (day === 2 || day === 22) suffix = "nd";
    else if (day === 3 || day === 23) suffix = "rd";

    formattedDate = formattedDate.replace("SUFFIX", suffix);

    return formattedDate;
};
export const isToday = (date: Date): boolean => {
    const today = new Date(Date.now());
    return (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
    );
};

export const isSameDate = (date1: Date, date2: Date): boolean => {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);

    return (
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getDate() === secondDate.getDate()
    );
};

export const getWeeksOfMonth = (date: Date, weeks: number) => {
    const offset = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const monthLength = monthLengths[date.getMonth()];
    
    const days = [];

    for (let i = 0; i < weeks * 7; i++) {
        if (i >= offset) {
            if (i <= monthLength + offset - 1) days[i] = i - offset + 1;
            else days[i] = i - (monthLength + offset - 1);
        } else {
            const previousMonth = date.getMonth() === 0 ? 11 : date.getMonth() - 1;
            const previousMonthLength = monthLengths[previousMonth];

            days[i] = previousMonthLength - (offset - (i + 1));
        };
    };

    return {
        days,
        offset,
        monthLength,
    };
};