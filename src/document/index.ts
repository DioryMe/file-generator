import { IDiory } from '@diograph/diograph'
import { generateDefaultDiory } from '../default'
import { getData } from './data'

export async function generateDocumentDiory(rootPath: string, subPath: string): Promise<IDiory> {
  const defaultDiory = await generateDefaultDiory(rootPath, subPath)
  const data: any[] = await getData(rootPath, subPath, defaultDiory.id)

  return defaultDiory.update({ data }, false)
}
