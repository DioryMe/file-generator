import { readFile } from 'fs/promises'
import { IDioryObject } from 'diograph-js'

import { getCid } from '../utils/getCid'

import { getText } from './text'
import { getImage } from './image'
import { getCreate } from './created'
import { getModified } from './modified'

export async function generateDefaultDioryObject(filePath: string, fileContent?: Buffer): Promise<IDioryObject> {
  if (!fileContent) {
    fileContent = await readFile(filePath)
  }

  const id: string = await getCid(fileContent)
  const text: string | undefined = getText(filePath)
  const image: string | undefined = getImage()
  const date: string | undefined = getCreate(filePath)
  const created: string | undefined = getCreate(filePath)
  const modified: string | undefined = getModified(filePath)

  return { id, text, image, date, created, modified }
}