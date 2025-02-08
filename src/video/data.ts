import { VideoObject } from './schema-types'

export async function getData(
  contentUrl: string,
  duration?: string,
  mime?: string,
): Promise<VideoObject[]> {
  const schema: VideoObject = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    contentUrl,
    encodingFormat: mime || 'application/octet-stream',
    ...(duration && { duration }),
  }

  return [schema]
}
