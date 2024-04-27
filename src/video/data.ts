import { VideoObject } from './schema-types'

function parseDuration(outputString: string): null | string {
  const matchArray = outputString.match(/(?<=Duration:\s).{11}/)
  return matchArray && matchArray[0]
}

export async function getData(
  metadataString: string,
  cid: string,
  mime?: string,
): Promise<VideoObject[]> {
  const duration: null | string = parseDuration(metadataString)

  const schema: VideoObject = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    contentUrl: cid,
    encodingFormat: mime || 'application/octet-stream',
    ...(duration && { duration }),
  }

  return [schema]
}
