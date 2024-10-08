import { IDataObject } from '@diory/types'

export interface ImageObject extends IDataObject {
  '@context': string
  '@type': string
  contentUrl: string
  encodingFormat: string
  height?: number
  width?: number
}
