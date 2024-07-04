import { IDiory } from '@diograph/diograph/types'
import { generateDefaultDiory } from '../default'
import { getData } from './data'
import { DigitalDocument } from './schema-types'

export async function generateDocumentDiory(rootPath: string, subPath: string): Promise<IDiory> {
  const defaultDiory: IDiory = await generateDefaultDiory(rootPath, subPath)
  const data: DigitalDocument[] = await getData(rootPath, subPath, defaultDiory.id)

  return defaultDiory.update({ data }, false)
}
