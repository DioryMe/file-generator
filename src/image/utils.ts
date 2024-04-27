import { load } from 'exifreader'

export function readExifTags(fileContent: Buffer) {
  return load(fileContent.buffer)
}
