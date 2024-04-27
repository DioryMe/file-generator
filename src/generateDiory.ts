import { IDiory } from '@diograph/diograph'
import { IDataClient } from '@diograph/local-client'

import { resolveFileType } from './utils/resolveFileType'

import { generateImageDiory } from './image'
import { generateVideoDiory } from './video'
import { generateDocumentDiory } from './document'
import { generateDefaultDiory } from './default'

export const generateDiory = async (
  rootPath: string,
  filePath: string,
  client: IDataClient,
): Promise<IDiory> => {
  const fileType = await resolveFileType(rootPath, filePath)
  switch (fileType) {
    case 'image':
      return generateImageDiory(rootPath, filePath, client)
    case 'video':
      return generateVideoDiory(rootPath, filePath, client)
    case 'document':
      return generateDocumentDiory(rootPath, filePath, client)
    // case 'audio':
    // case 'application':
    // case 'text':
    default:
      return generateDefaultDiory(rootPath, filePath, client)
  }
}
