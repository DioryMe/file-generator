import { fromFile } from 'file-type'
const { join } = require('path')

export async function resolveFileType(
  rootPath: string,
  subPath: string,
): Promise<string | undefined> {
  const filePath = join(rootPath, subPath)
  const fileMimeType = await fromFile(filePath)
  if (!fileMimeType?.mime) {
    return
  }

  const fileType: string = fileMimeType.mime.split('/')[0]
  switch (fileType) {
    case 'image':
      return 'image'
    case 'video':
      return 'video'
    default:
      return 'document'
  }
}
