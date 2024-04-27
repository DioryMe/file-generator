import { IDiory } from '@diograph/diograph'
import { generateDefaultDiory } from '../default'
import { getData } from './data'
import { DigitalDocument } from './schema-types'
import { IDataClient } from '@diograph/local-client'

export async function generateDocumentDiory(
  rootPath: string,
  subPath: string,
  client: IDataClient,
): Promise<IDiory> {
  const defaultDiory: IDiory = await generateDefaultDiory(rootPath, subPath, client)
  const data: DigitalDocument[] = await getData(rootPath, subPath, defaultDiory.id)

  return defaultDiory.update({ data }, false)
}
