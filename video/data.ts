import { VideoObject } from './schema-types'
import { fromFile, FileTypeResult } from 'file-type'

function parseDuration(outputString: string): null | string {
  const matchArray = outputString.match(/(?<=Duration:\s).{11}/)
  return matchArray && matchArray[0]
}

export async function getData(filePath: string, metadataString: string, ) {
  const fileType: FileTypeResult | undefined = await fromFile(filePath)
  const duration: null | string = parseDuration(metadataString)
  const schema: VideoObject = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    contentUrl: filePath,
    encodingFormat: fileType?.mime,
    ...(duration && { duration })
  }

  return [schema]
}