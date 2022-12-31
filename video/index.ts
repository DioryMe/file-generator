import { IDiory } from '@diograph/diograph'

import { ifDefined } from '../utils/ifDefined'
import { generateMetadata } from './utils/generateMetadata'

import { generateDefaultDiory } from '../default'
import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getData } from './data'

export async function generateVideoDiory(filePath: string): Promise<IDiory> {
  const { thumbnailBuffer, metadataString } = await generateMetadata(filePath)

  const defaultDiory = await generateDefaultDiory(filePath)

  const text = undefined
  const image: string | undefined = thumbnailBuffer && await getImage(thumbnailBuffer)
  const date: string | undefined = getDate(metadataString)
  const latlng: string | undefined = getLatlng(metadataString)
  const data: any[] = await getData(filePath, metadataString)

  return defaultDiory.update({ text }).update(ifDefined({ image, date, latlng, data }))
}
