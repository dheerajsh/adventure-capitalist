import numeral from 'numeral'

export function convertMS(milliseconds: number) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
        day: day,
        hour: hour,
        minute: minute,
        seconds: seconds
    };
}

export function formatCurrency(currency: number): string {

    return numeral(currency).format('($ 0.00 a)')
}

export function formatBusinessValue(currency: number): string {

    return numeral(currency).format('$0,0.00')
}