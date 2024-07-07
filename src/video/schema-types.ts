import { IDataObject } from '@diory/types'

export interface VideoObject extends IDataObject {
  '@context': string
  '@type': string
  contentUrl: string
  encodingFormat: string
  duration?: string
}
