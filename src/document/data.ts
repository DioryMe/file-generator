import { getFileData } from '../utils/getFileData'
import { DigitalDocument } from './schema-types'

export async function getData(rootPath: string, subPath: string): Promise<any[]> {
  const { contentUrl, encodingFormat } = await getFileData(rootPath, subPath)

  const schema: DigitalDocument = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    contentUrl,
    encodingFormat,
  }

  return [schema]
}
