import { CID } from 'multiformats/cid'
import * as raw from 'multiformats/codecs/raw'
import { sha256 } from 'multiformats/hashes/sha2'

import { dioryImageGenerator } from './image'
import { dioryVideoGenerator } from './video'
import { statSync } from 'fs'
import { basename } from 'path'
import { fromFile } from 'file-type'
import { readFile } from 'fs/promises'
import { DioryAttributes, DioryGeneratorData, DioryObject } from './types'
import { getDefaultImage } from './diory/getDefaultImage'
import { v4 as uuidv4 } from 'uuid'

class Generator {
  generators: Array<object> = []
  jee: any = {
    encodingFormat: 'image',
    fileTypes: ['jpg', 'jpeg'],
    generator: dioryImageGenerator,
  }

  constructor() {}

  addGenerator = (generator: object) => {
    this.generators.push(generator)
  }

  generatedDioryData = async (filePath: string): Promise<DioryGeneratorData> => {
    const defaultSchema: any = {
      '@context': 'https://schema.org',
      '@type': 'DigitalDocument',
      contentUrl: filePath,
    }

    const fileType = await fromFile(filePath)
    if (!fileType || !fileType.mime) {
      return { typeSpecificDiory: { data: [defaultSchema] } }
    }
    defaultSchema.encodingFormat = fileType.mime

    const type = fileType.mime.split('/')[0]

    const fileContent = await readFile(filePath)

    const hash = await sha256.digest(fileContent)
    const cid = CID.create(1, raw.code, hash).toString()

    switch (type) {
      case 'image':
        return dioryImageGenerator(fileContent, filePath, cid, fileType.mime)
      case 'video':
        return dioryVideoGenerator(filePath, cid)
      case 'audio':
        defaultSchema['@type'] = 'AudioObject'
        break
      // case 'application':
      // case 'text':
      default:
    }

    return { typeSpecificDiory: { data: [defaultSchema] } }
  }

  generateDiory = ({
    text,
    date,
    image,
    latlng,
    created,
    modified,
    data,
  }: DioryAttributes): DioryObject => {
    return {
      id: uuidv4(),
      ...(text && { text }),
      ...(image ? { image } : { image: getDefaultImage() }),
      ...(date && { date }),
      ...(latlng && { latlng }),
      ...(created && { created }),
      ...(modified && { modified }),
      ...(data && { data }),
    }
  }

  baseData = (filePath: string): DioryAttributes => {
    const { birthtime, mtime } = statSync(filePath) || {}
    return {
      text: basename(filePath),
      created: birthtime && birthtime.toISOString(),
      modified: mtime && mtime.toISOString(),
    }
  }

  generateDioryFromFile = async (filePath: string) => {
    const { typeSpecificDiory, thumbnailBuffer, cid } = await this.generatedDioryData(filePath)
    const dioryObject = this.generateDiory({
      ...this.baseData(filePath),
      ...typeSpecificDiory,
    })
    return { dioryObject, thumbnailBuffer, cid }
  }
}

export { dioryImageGenerator, dioryVideoGenerator, Generator, getDefaultImage }
