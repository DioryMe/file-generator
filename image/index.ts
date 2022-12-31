import { readFile } from 'fs/promises'
import { IDioryObject } from '@diograph/diograph'

import { readExifTags } from './utils'

import { generateDefaultDioryObject } from '../default'
import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getCreated } from './created'
import { getData } from './data'

export async function generateImageDioryObject(filePath: string): Promise<IDioryObject> {
  const fileContent = await readFile(filePath)
  const tags: object = readExifTags(filePath)

  const defaultDioryObject = await generateDefaultDioryObject(filePath, fileContent)
  const text = undefined
  const image: string | undefined = await getImage(fileContent)
  const date: string | undefined = getDate(tags)
  const latlng: string | undefined = getLatlng(tags)
  const created: string | undefined = getCreated(tags)
  const data: any[] = await getData(filePath, tags)

  return { ...defaultDioryObject, text, image, date, latlng, created, data }
}
