import { getFileData } from '../utils/getFileData'
import { VideoObject } from './schema-types'

function parseDuration(outputString: string): null | string {
  const matchArray = outputString.match(/(?<=Duration:\s).{11}/)
  return matchArray && matchArray[0]
}

export async function getData(rootPath: string, subPath: string, metadataString: string) {
  const { contentUrl, encodingFormat } = await getFileData(rootPath, subPath)
  const duration: null | string = parseDuration(metadataString)

  const schema: VideoObject = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    contentUrl,
    encodingFormat,
    ...(duration && { duration }),
  }

  return [schema]
}
