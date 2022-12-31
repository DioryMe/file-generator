import { IDiory } from '@diograph/diograph'

export interface IFileDiory extends IDiory {
  generate: (filePath: string) => IFileDiory
}
