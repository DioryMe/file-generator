import { getFileData } from '../utils/getFileData'
import { ImageObject } from './schema-types'

function getHeight(tags: any): string | undefined {
  return tags['Image Height']?.value
}

function getWidth(tags: any): string | undefined {
  return tags['Image Width']?.value
}

export async function getData(rootPath: string, subPath: string, tags: any, ) {
  const { contentUrl, encodingFormat } = await getFileData(rootPath, subPath)

  const schema: ImageObject = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl,
    encodingFormat,
    height: getHeight(tags),
    width: getWidth(tags),
  }
  return [schema]
}