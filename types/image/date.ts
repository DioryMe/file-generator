function formatHour(hour: number) {
  return `0${hour % 24}`.slice(-2)
}

function getDateTime(dateTime: any) {
  if (!dateTime) {
    return
  }
  const [year, month, date, hour, min, sec] = dateTime.value[0].split(/\D/)
  return `${[year, month, date].join('-')}T${[formatHour(hour), min, sec].join(':')}.000Z`
}

export function getDate({ DateTime, DateTimeOriginal }: any): string | undefined {
  return getDateTime(DateTime) || getDateTime(DateTimeOriginal)
}
