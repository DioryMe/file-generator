import { readFileSync } from 'fs'
import { load } from 'exifreader'

export function readExifTags(imagePath = '') {
  const file = readFileSync(imagePath)
  return load(file.buffer)
}