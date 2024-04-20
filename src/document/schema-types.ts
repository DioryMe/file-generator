import { IDataObject } from '@diograph/diograph'

export interface DigitalDocument extends IDataObject {
  '@context': string
  '@type': string
  contentUrl: string
  encodingFormat: string
}
