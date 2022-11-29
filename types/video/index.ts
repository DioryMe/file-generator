import { IDiory } from 'diograph-js'

import { generateMetadata } from './utils/generateMetadata'
import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getData } from './data'
import { generateDefaultDiory } from '../../default'

export async function generateVideoDiory(id: string, filePath: string): Promise<IDiory> {
  const { thumbnailBuffer, metadataString } = await generateMetadata(filePath)

  const text = undefined
  const image: string | undefined = thumbnailBuffer && await getImage(thumbnailBuffer)
  const date: string | undefined = getDate(metadataString)
  const latlng: string | undefined = getLatlng(metadataString)
  const data: any[] = await getData(filePath, metadataString)

  const diory: IDiory = await generateDefaultDiory(id, filePath)
  return diory.update({ text, image, date, latlng, data })
}
