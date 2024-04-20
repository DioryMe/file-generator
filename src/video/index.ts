import { join } from 'path'
import { IDiory } from '@diograph/diograph/types'

import { ifDefined } from '../utils/ifDefined'
import { generateMetadata } from './utils/generateMetadata'

import { generateDefaultDiory } from '../default'
import { getImage } from './image'
import { getDate } from './date'
import { getLatlng } from './latlng'
import { getData } from './data'

export async function generateVideoDiory(rootPath: string, subPath: string): Promise<IDiory> {
  const filePath = join(rootPath, subPath)

  const text = undefined
  const defaultDiory = (await generateDefaultDiory(rootPath, subPath)).update({ text }, false)

  try {
    const { thumbnailBuffer, metadataString } = await generateMetadata(filePath)

    const image: string | undefined = thumbnailBuffer && (await getImage(thumbnailBuffer))
    const date: string | undefined = getDate(metadataString)
    const latlng: string | undefined = getLatlng(metadataString)
    const data: any[] = await getData(rootPath, subPath, metadataString, defaultDiory.id)

    return defaultDiory.update(ifDefined({ image, date, latlng, data }), false)
  } catch (error) {
    console.error(error)
    return defaultDiory
  }
}
