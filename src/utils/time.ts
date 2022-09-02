export function getWibTime(time: string) {
  const date = new Date(time);
  const wibOffset = date.getTimezoneOffset() / 60 + 7;
  return new Date(date.getTime() + wibOffset * 60 * 60 * 1000);
}

export function getHourMinuteString(date: Date) {
  return `${getTwoDigitsNumber(date.getHours())}:${getTwoDigitsNumber(
    date.getMinutes(),
  )}`;
}

export function getTwoDigitsNumber(number: number) {
  return number.toString().padStart(2, '0');
}
