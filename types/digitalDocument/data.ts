import { FileTypeResult, fromFile } from 'file-type'
import { DigitalDocument } from './schema-types'

export async function getData(filePath: string): Promise<any[]> {
  const fileType: FileTypeResult | undefined = await fromFile(filePath)

  const schema: DigitalDocument = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    contentUrl: filePath,
    encodingFormat: fileType?.mime,
  }
  return [schema]
}