import { IDiory } from 'diograph-js'
import { readFile } from 'fs/promises'
import { getCid } from './utils/getCid'
import { resolveFileType } from './utils/resolveFileType'

import { generateDefaultDiory } from './default'
import { generateImageDiory } from './types/image'
import { generateVideoDiory } from './types/video'
import { generateDigitalDocumentDiory } from './types/digitalDocument'

export async function generateFileDiory(filePath: string): Promise<IDiory> {
  const fileContent = await readFile(filePath)
  const id: string = await getCid(fileContent)

  const fileType = await resolveFileType(filePath)
  switch (fileType) {
    case 'image':
      return generateImageDiory(id, filePath, fileContent)
    case 'video':
      return generateVideoDiory(id, filePath)
    case 'document':
      return generateDigitalDocumentDiory(id, filePath)
    // case 'audio':
    // case 'application':
    // case 'text':
    default:
      return generateDefaultDiory(id, filePath)
  }
}
