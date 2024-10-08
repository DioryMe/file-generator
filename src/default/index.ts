import { join } from 'path-browserify'

import { Diory } from '@diograph/diograph'
import { IDiory, IDataClient } from '@diory/types'

import { getCid } from '../utils/getCid'
import { getImage } from './image'

export async function generateDefaultDiory(
  rootUrl: string,
  subPath: string,
  client: IDataClient,
  fileContent?: Buffer,
): Promise<IDiory> {
  const filePath = join(rootUrl, subPath)
  if (!fileContent) {
    fileContent = await client.readItem(filePath)
  }

  const id: string = await getCid(fileContent)
  const image: string | undefined = getImage()
  const { name, created, modified } = client.getMetadata(filePath)

  return new Diory({ id, text: name, image, date: created, created, modified })
}
