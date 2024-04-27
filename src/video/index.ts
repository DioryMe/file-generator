import { join } from 'path-browserify'
import { IDiory } from '@diograph/diograph'

import { ifDefined } from '../utils/ifDefined'
import { generateMetadata } from './utils/generateMetadata'

import { generateDefaultDiory } from '../default'
import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getData } from './data'
import { VideoObject } from './schema-types'
import { IDataClient } from '@diograph/local-client'

export async function generateVideoDiory(
  rootUrl: string,
  subPath: string,
  client: IDataClient,
): Promise<IDiory> {
  const fileUrl = join(rootUrl, subPath)

  const defaultDiory: IDiory = (await generateDefaultDiory(rootUrl, subPath, client)).update(
    { text: undefined },
    false,
  )

  try {
    const { thumbnailBuffer, metadataString } = await generateMetadata(fileUrl)
    const { mime } = await client.getFileType(fileUrl)

    const image: string | undefined = thumbnailBuffer && (await getImage(thumbnailBuffer))
    const date: string | undefined = getDate(metadataString)
    const latlng: string | undefined = getLatlng(metadataString)
    const data: VideoObject[] = await getData(metadataString, defaultDiory.id, mime)

    return defaultDiory.update(ifDefined({ image, date, latlng, data }), false)
  } catch (error) {
    console.error(error)
    return defaultDiory
  }
}
