import { join } from 'path-browserify'
import { IDiory } from '@diograph/diograph'

import { ifDefined } from '../utils/ifDefined'
import { readExifTags } from './utils'

import { generateDefaultDiory } from '../default'
import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getCreated } from './created'
import { getData } from './data'
import { ImageObject } from './schema-types'
import { IDataClient } from '@diograph/local-client'

export async function generateImageDiory(
  rootUrl: string,
  subPath: string,
  client: IDataClient,
): Promise<IDiory> {
  const fileUrl = join(rootUrl, subPath)
  const fileContent: Buffer = await client.readItem(fileUrl)
  const tags: object = readExifTags(fileContent)
  const { mime } = await client.getFileType(fileUrl)

  const defaultDiory: IDiory = await generateDefaultDiory(rootUrl, subPath, client, fileContent)

  const text = undefined
  const image: string | undefined = await getImage(fileContent)
  const date: string | undefined = getDate(tags)
  const latlng: string | undefined = getLatlng(tags)
  const created: string | undefined = getCreated(tags)
  const data: ImageObject[] = await getData(tags, defaultDiory.id, mime)

  return defaultDiory
    .update({ text }, false)
    .update(ifDefined({ image, date, latlng, created, data }), false)
}
