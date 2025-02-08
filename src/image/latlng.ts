export function getLatlng({ lat, lng }: any): string | undefined {
  return lat && lng && `${lat}, ${lng}`
}
