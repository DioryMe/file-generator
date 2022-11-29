import { IDiory } from 'diograph-js'

import { readExifTags } from './utils'
import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getCreated } from './created'
import { getData } from './data'
import { generateDefaultDiory } from '../../default'

export async function generateImageDiory(id: string, filePath: string, fileContent: Buffer): Promise<IDiory> {
  const tags: object = readExifTags(filePath)

  const text = undefined
  const image: string | undefined = await getImage(fileContent)
  const date: string | undefined = getDate(tags)
  const latlng: string | undefined = getLatlng(tags)
  const created: string | undefined = getCreated(tags)
  const data: any[] = await getData(filePath, tags)

  const diory: IDiory = await generateDefaultDiory(id, filePath)
  return diory.update({ text, image, date, latlng, created, data })
}
