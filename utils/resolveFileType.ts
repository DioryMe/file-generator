import { fromFile } from 'file-type'

export async function resolveFileType(filePath: string): Promise<string | undefined> {
  const fileMimeType = await fromFile(filePath)
  if (!fileMimeType?.mime) {
    return
  }

  const fileType: string = fileMimeType.mime.split('/')[0]
  switch(fileType) {
    case 'image': return 'image'
    case 'video': return 'video'
    default: return 'document'
  }
}