import { join } from 'path-browserify'
import { FileTypeResult, fromFile } from 'file-type'

interface FileData {
  contentUrl: string
  encodingFormat?: string
}

export async function getFileData(rootPath: string, subPath: string): Promise<FileData> {
  const filePath = join(rootPath, subPath)
  const fileType: FileTypeResult | undefined = await fromFile(filePath)

  return {
    contentUrl: subPath,
    encodingFormat: fileType?.mime,
  }
}
