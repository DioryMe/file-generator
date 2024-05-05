import { VideoObject } from './schema-types'

export async function getData(
  cid: string,
  duration?: string,
  mime?: string,
): Promise<VideoObject[]> {
  const schema: VideoObject = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    contentUrl: cid,
    encodingFormat: mime || 'application/octet-stream',
    ...(duration && { duration }),
  }

  return [schema]
}
