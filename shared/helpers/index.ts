export const dateDiplayFormat = ({ date, format, locale }: { date: string; format?: "weekDayNumber" | "weekDay" | "m" | "d" | "HH:mm"| "dd mm"| "ddd dd mm"| "ddd dd mm yyyy" | "dd mm yyyy" | "yyyy/mm/dd" | "YYYY-MM-DD" | "yyyy/mm/dd h:m" , locale?: string }): string => {

    if (!date) return "";

    const persianWeekdays = [
        'یک‌شنبه',
        'دوشنبه',
        'سه‌شنبه',
        'چهارشنبه',
        'پنج‌شنبه',
        'جمعه',
        'شنبه'
    ];
    const dateObject = new Date(date);
    const day = dateObject.toLocaleString(locale, { day: "numeric" });
    const weekDay = dateObject.toLocaleString(locale, { weekday: 'short' });
    const weekDayNumber = dateObject.getDay();
    const month = dateObject.toLocaleString(locale, { month: "long" });
    const day2digit = dateObject.toLocaleString(locale, { day: "2-digit" })
    const month2digit = dateObject.toLocaleString(locale, { month: "2-digit" });
    const year = dateObject.toLocaleString(locale, { year: "numeric" });

    let h = dateObject.getHours().toString().padStart(2, '0');
    let m = dateObject.getMinutes().toString().padStart(2, '0');

    if (format === "HH:mm"){
        const h = dateObject.toLocaleString(locale, { hour: "2-digit" }).padStart(2, '0');
        const m = dateObject.toLocaleString(locale, { minute: "2-digit" }).padStart(2, '0');
        return(h+":"+m);
    }

    if (format === "ddd dd mm") {
        return (`${weekDay}, ${day}${month}`)
    }

    if (format === "dd mm yyyy") {
        return (`${day} ${month} ${year}`)
    }

    if (format == "weekDay") {
        return persianWeekdays[weekDayNumber]
    }

    if (format === "yyyy/mm/dd") {
        return (`${year}/${month2digit}/${day2digit}`)
    }
    if (format === "YYYY-MM-DD") {
        return (`${year}-${month2digit}-${day2digit}`)
    }

    if (format === "yyyy/mm/dd h:m"){
        return (`${year}/${month2digit}/${day2digit} - ${h}:${m}`)
    }

    if (format === "dd mm"){
        return (`${day}, ${month}`)
    }
    if (format === "d"){
        return (day2digit)
    }
    if (format === "m"){
        return (month)
    }

    if(format === "weekDayNumber"){
        return weekDayNumber.toString()
    }

    if (format === "ddd dd mm yyyy"){
        return (`${weekDay} ${day} ${month} ${year}`)
    }

    return date;
}

export const dateFormat = (date: Date) => {

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`
}