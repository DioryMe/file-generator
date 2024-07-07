import { IDataObject } from '@diory/types'

export interface DigitalDocument extends IDataObject {
  '@context': string
  '@type': string
  contentUrl: string
  encodingFormat: string
}
