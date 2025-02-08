import { ImageObject } from './schema-types'

export async function getData(
  contentUrl: string,
  tags: any,
  encodingFormat?: string,
): Promise<ImageObject[]> {
  const schema: ImageObject = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl,
    encodingFormat: encodingFormat || 'application/octet-stream',
    height: tags.height,
    width: tags.width,
  }
  return [schema]
}
