import { join } from 'path'
import { readFile } from 'fs/promises'

import { Diory, IDiory } from '@diograph/diograph'

import { getCid } from '../utils/getCid'

import { getText } from './text'
import { getImage } from './image'
import { getCreate } from './created'
import { getModified } from './modified'

export async function generateDefaultDiory(
  rootPath: string,
  subPath: string,
  fileContent?: Buffer,
): Promise<IDiory> {
  const filePath = join(rootPath, subPath)
  if (!fileContent) {
    fileContent = await readFile(filePath)
  }

  const id: string = await getCid(fileContent)
  const text: string | undefined = getText(filePath)
  const image: string | undefined = getImage()
  const date: string | undefined = getCreate(filePath)
  const created: string | undefined = getCreate(filePath)
  const modified: string | undefined = getModified(filePath)

  return new Diory({ id, text, image, date, created, modified })
}
