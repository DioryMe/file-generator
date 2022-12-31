import { IDioryObject } from '@diograph/diograph'

import { generateMetadata } from './utils/generateMetadata'

import { generateDefaultDioryObject } from '../default'
import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getData } from './data'

export async function generateVideoDioryObject(filePath: string): Promise<IDioryObject> {
  const { thumbnailBuffer, metadataString } = await generateMetadata(filePath)

  const defaultDioryObject = await generateDefaultDioryObject(filePath)
  const text = undefined
  const image: string | undefined = thumbnailBuffer && await getImage(thumbnailBuffer)
  const date: string | undefined = getDate(metadataString)
  const latlng: string | undefined = getLatlng(metadataString)
  const data: any[] = await getData(filePath, metadataString)

  return { ...defaultDioryObject, text, image, date, latlng, data }
}
