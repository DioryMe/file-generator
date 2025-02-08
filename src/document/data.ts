import { DigitalDocument } from './schema-types'

export function getData(contentUrl: string, encodingFormat?: string): DigitalDocument[] {
  const schema: DigitalDocument = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    contentUrl,
    encodingFormat: encodingFormat || 'application/octet-stream',
  }

  return [schema]
}
