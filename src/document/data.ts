import { DigitalDocument } from './schema-types'

export async function getData(cid: string, mime?: string): Promise<DigitalDocument[]> {
  const schema: DigitalDocument = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    contentUrl: cid,
    encodingFormat: mime || 'application/octet-stream',
  }

  return [schema]
}
