import { join } from 'path-browserify'

import { IDataClient } from '@diory/types'
import { IDiory } from '@diory/types'

import { ifDefined } from '../utils/ifDefined'

import { generateDefaultDiory } from '../default'
import { getData } from './data'
import { VideoObject } from './schema-types'

export async function generateVideoDiory(rootUrl: string, subPath: string, client: IDataClient) {
  const fileUrl = join(rootUrl, subPath)
  const { mime } = await client.getFileType(fileUrl)

  const diory: IDiory = await generateDefaultDiory(rootUrl, subPath, client)

  if (client.getVideoMetadata) {
    const { thumbnail, created, duration, latlng } = await client.getVideoMetadata(fileUrl)
    const data: VideoObject[] = await getData(diory.id, duration, mime)

    diory.update(
      ifDefined({
        text: undefined,
        image: thumbnail,
        date: created,
        latlng,
        data,
      }),
      false,
    )
  }

  return diory
}
