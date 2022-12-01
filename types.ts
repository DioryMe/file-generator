import { IDiory } from 'diograph-js'

export interface IFileDiory extends IDiory {
  generate: (filePath: string) => IFileDiory
}
