import { IDiory } from 'diograph-js'

import { generateDefaultDiory } from '../../default'
import { getData } from './data'

export async function generateDigitalDocumentDiory(id: string, filePath: string): Promise<IDiory> {
  const data: any[] = await getData(filePath)

  const diory: IDiory = await generateDefaultDiory(id, filePath)
  return diory.update({ data })
}