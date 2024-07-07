import { join } from 'path-browserify'
import { IDiory } from '@diograph/diograph'
import { IDataClient } from '@diograph/local-client'

import { generateDefaultDiory } from '../default'
import { getData } from './data'
import { DigitalDocument } from './schema-types'

export async function generateDocumentDiory(
  rootUrl: string,
  subPath: string,
  client: IDataClient,
): Promise<IDiory> {
  const fileUrl = join(rootUrl, subPath)
  const { mime } = await client.getFileType(fileUrl)

  const defaultDiory: IDiory = await generateDefaultDiory(rootUrl, subPath, client)

  const data: DigitalDocument[] = await getData(defaultDiory.id, mime)

  return defaultDiory.update({ data }, false)
}
