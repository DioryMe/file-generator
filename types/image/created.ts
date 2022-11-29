function getIsoDate(isoDate: any) {
  return isoDate && isoDate.value.slice(0, 23) + 'Z' // eslint-disable-line prefer-template
}

export function getCreated({ DateCreated, CreateDate }: any): string | undefined {
  return getIsoDate(DateCreated) || getIsoDate(CreateDate)
}

