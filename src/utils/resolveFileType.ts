const { join } = require('path-browserify')
import { IDataClient } from '@diograph/local-client'

export async function resolveFileType(
  rootUrl: string,
  subPath: string,
  client: IDataClient,
): Promise<string | undefined> {
  const fileUrl = join(rootUrl, subPath)
  const { mime } = await client.getFileType(fileUrl)

  if (!mime) {
    return
  }

  const fileType: string = mime.split('/')[0]
  switch (fileType) {
    case 'image':
      return 'image'
    case 'video':
      return 'video'
    default:
      return 'document'
  }
}
