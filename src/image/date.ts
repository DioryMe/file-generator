export function getDate({ dateTime, dateTimeOriginal }: any): string | undefined {
  return dateTime || dateTimeOriginal
}
