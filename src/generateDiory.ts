import { IDiory } from '@diory/types'
import { IDataClient } from '@diory/types'

import { resolveFileType } from './utils/resolveFileType'

import { generateImageDiory } from './image'
import { generateVideoDiory } from './video'
import { generateDocumentDiory } from './document'
import { generateDefaultDiory } from './default'

export const generateDiory = async (
  rootUrl: string,
  filePath: string,
  client: IDataClient,
): Promise<IDiory> => {
  const fileType = await resolveFileType(rootUrl, filePath, client)
  switch (fileType) {
    case 'image':
      return generateImageDiory(rootUrl, filePath, client)
    case 'video':
      return generateVideoDiory(rootUrl, filePath, client)
    case 'document':
      return generateDocumentDiory(rootUrl, filePath, client)
    // case 'audio':
    // case 'application':
    // case 'text':
    default:
      return generateDefaultDiory(rootUrl, filePath, client)
  }
}
