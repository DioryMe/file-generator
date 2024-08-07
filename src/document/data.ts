import { getFileData } from '../utils/getFileData'
import { DigitalDocument } from './schema-types'

export async function getData(
  rootPath: string,
  subPath: string,
  cid: string,
): Promise<DigitalDocument[]> {
  const { encodingFormat } = await getFileData(rootPath, subPath)

  const schema: DigitalDocument = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    contentUrl: cid,
    encodingFormat: encodingFormat || 'application/octet-stream',
  }

  return [schema]
}
