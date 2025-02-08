import { load } from 'exifreader'

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

function getHeight(tags: any): number | undefined {
  return tags['Image Height']?.value
}

function getWidth(tags: any): number | undefined {
  return tags['Image Width']?.value
}

function getIsoDate(isoDate: any) {
  return isoDate && isoDate.value.slice(0, 23) + 'Z' // eslint-disable-line prefer-template
}

export function readExifTags(fileContent: Buffer) {
  const tags = load(fileContent.buffer)
  return {
    dateTime: getDateTime(tags.DateTime),
    dateTimeOriginal: getDateTime(tags.DateTimeOriginal),
    height: getHeight(tags),
    width: getWidth(tags),
    dateCreated: getIsoDate(tags.DateCreated),
    createDate: getIsoDate(tags.CreateDate),
    lat: tags.GPSLatitude?.description,
    lng: tags.GPSLongitude?.description,
  }
}
