import { IDiory } from '@diograph/diograph'

import { resolveFileType } from './utils/resolveFileType'

import { generateImageDiory } from './image'
import { generateVideoDiory } from './video'
import { generateDocumentDiory } from './document'
import { generateDefaultDiory } from './default'

export const generateFileDiory = async (filePath: string): Promise<IDiory> => {
  const fileType = await resolveFileType(filePath)
  switch (fileType) {
    case 'image':
      return generateImageDiory(filePath)
    case 'video':
      return generateVideoDiory(filePath)
    case 'document':
      return generateDocumentDiory(filePath)
    // case 'audio':
    // case 'application':
    // case 'text':
    default:
      return generateDefaultDiory(filePath)
  }
}
