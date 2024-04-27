import { ImageObject } from './schema-types'

function getHeight(tags: any): number | undefined {
  return tags['Image Height']?.value
}

function getWidth(tags: any): number | undefined {
  return tags['Image Width']?.value
}

export async function getData(tags: any, cid: string, mime?: string): Promise<ImageObject[]> {
  const schema: ImageObject = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: cid,
    encodingFormat: mime || 'application/octet-stream',
    height: getHeight(tags),
    width: getWidth(tags),
  }
  return [schema]
}
