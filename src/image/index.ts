import { join } from 'path'
import { readFile } from 'fs/promises'
import { IDiory } from '@diograph/diograph'

import { ifDefined } from '../utils/ifDefined'
import { readExifTags } from './utils'

import { generateDefaultDiory } from '../default'
import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getCreated } from './created'
import { getData } from './data'

export async function generateImageDiory(rootPath: string, subPath: string): Promise<IDiory> {
  const filePath = join(rootPath, subPath)
  const fileContent = await readFile(filePath)
  const tags: object = readExifTags(filePath)

  const defaultDiory = await generateDefaultDiory(rootPath, subPath, fileContent)

  const text = undefined
  const image: string | undefined = await getImage(fileContent)
  const date: string | undefined = getDate(tags)
  const latlng: string | undefined = getLatlng(tags)
  const created: string | undefined = getCreated(tags)
  const data: any[] = await getData(rootPath, subPath, tags)

  return defaultDiory
    .update({ text }, false)
    .update(ifDefined({ image, date, latlng, created, data }), false)
}
