import { IDioryObject } from 'diograph-js'

import { resolveFileType } from './utils/resolveFileType'

import { generateImageDioryObject } from './image'
import { generateVideoDioryObject } from './video'
import { generateDocumentDioryObject } from './document'
import { generateDefaultDioryObject } from './default'

export const generateFileDioryObject = async (filePath: string): Promise<IDioryObject> => {
  const fileType = await resolveFileType(filePath)
  switch (fileType) {
    case 'image':
      return generateImageDioryObject(filePath)
    case 'video':
      return generateVideoDioryObject(filePath)
    case 'document':
      return generateDocumentDioryObject(filePath)
    // case 'audio':
    // case 'application':
    // case 'text':
    default:
      return generateDefaultDioryObject(filePath)
  }
}
