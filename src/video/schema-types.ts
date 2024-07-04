import { IDataObject } from '@diograph/diograph/types'

export interface VideoObject extends IDataObject {
  '@context': string
  '@type': string
  contentUrl: string
  encodingFormat: string
  duration?: string
}
