import { IDiory } from '@diograph/diograph'
import { generateDefaultDiory } from '../default'
import { getData } from './data'

export async function generateDocumentDiory(filePath: string): Promise<IDiory> {
  const data: any[] = await getData(filePath)

  const defaultDiory = await generateDefaultDiory(filePath)
  return defaultDiory.update({ data })
}