import { FileTypeResult, fromFile } from 'file-type'
import { ImageObject } from './schema-types'

function getHeight(tags: any): string | undefined {
  return tags['Image Height']?.value
}

function getWidth(tags: any): string | undefined {
  return tags['Image Width']?.value
}

export async function getData(filePath: string, tags: any, ) {
  const fileType: FileTypeResult | undefined = await fromFile(filePath)

  const schema: ImageObject = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: filePath,
    encodingFormat: fileType?.mime,
    height: getHeight(tags),
    width: getWidth(tags),
  }
  return [schema]
}