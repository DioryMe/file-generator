export function getLatlng({ GPSLatitude = {}, GPSLongitude = {} }: any): string | undefined {
  const lat = GPSLatitude.description
  const lng = GPSLongitude.description
  return lat && lng && `${lat}, ${lng}`
}

