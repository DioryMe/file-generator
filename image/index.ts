import { DioryGeneratorData } from '../types'
import { retrieveMetadata } from './metadata'
import { generateThumbnail } from './thumbnailer'

async function dioryImageGenerator(
  fileContent: Buffer,
  filePath: string,
  cid: string,
  encodingFormat: string,
): Promise<DioryGeneratorData> {
  const thumbnailBuffer = await generateThumbnail(fileContent)

  const typeSpecificDiory = await retrieveMetadata(filePath, cid, encodingFormat)

  return { typeSpecificDiory, thumbnailBuffer, cid }
}

export { dioryImageGenerator }
