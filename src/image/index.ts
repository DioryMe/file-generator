import { join } from 'path-browserify'

import { IDiory } from '@diograph/diograph'
import { IDataClient } from '@diory/client-js'

import { ifDefined } from '../utils/ifDefined'
import { generateDefaultDiory } from '../default'

import { readExifTags } from './utils'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getCreated } from './created'
import { getData } from './data'
import { ImageObject } from './schema-types'

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
  const image: string | undefined = client.getThumbnail
    ? await client.getThumbnail(fileUrl)
    : undefined
  const date: string | undefined = getDate(tags)
  const latlng: string | undefined = getLatlng(tags)
  const created: string | undefined = getCreated(tags)
  const data: ImageObject[] = await getData(tags, defaultDiory.id, mime)

  return defaultDiory
    .update({ text }, false)
    .update(ifDefined({ image, date, latlng, created, data }), false)
}
