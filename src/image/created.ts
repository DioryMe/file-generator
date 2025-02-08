export function getCreated({ dateCreated, createDate }: any): string | undefined {
  return dateCreated || createDate
}
