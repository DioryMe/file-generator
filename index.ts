import { IDiory } from '@diograph/diograph'

import { resolveFileType } from './utils/resolveFileType'

import { generateImageDiory } from './image'
import { generateVideoDiory } from './video'
import { generateDocumentDiory } from './document'
import { generateDefaultDiory } from './default'

export const generateFileDiory = async (rootPath: string, filePath: string): Promise<IDiory> => {
  const fileType = await resolveFileType(rootPath, filePath)
  switch (fileType) {
    case 'image':
      return generateImageDiory(rootPath, filePath)
    case 'video':
      return generateVideoDiory(rootPath, filePath)
    case 'document':
      return generateDocumentDiory(rootPath, filePath)
    // case 'audio':
    // case 'application':
    // case 'text':
    default:
      return generateDefaultDiory(rootPath, filePath)
  }
}
