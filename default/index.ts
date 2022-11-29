import { Diory, IDiory } from 'diograph-js'

import { getText } from './text'
import { getImage } from './image'
import { getCreate } from './created'
import { getModified } from './modified'

export async function generateDefaultDiory(id: string, filePath: string): Promise<IDiory> {
  const text = getText(filePath)
  const image = getImage()
  const date = getCreate(filePath)
  const created = getCreate(filePath)
  const modified = getModified(filePath)

  return new Diory({ id, text, image, date, created, modified })
}