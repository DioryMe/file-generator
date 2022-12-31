import { IDioryObject } from '@diograph/diograph'
import { generateDefaultDioryObject } from '../default'
import { getData } from './data'

export async function generateDocumentDioryObject(filePath: string): Promise<IDioryObject> {
  const data: any[] = await getData(filePath)

  const defaultDioryObject = await generateDefaultDioryObject(filePath)
  return { ...defaultDioryObject, data }}