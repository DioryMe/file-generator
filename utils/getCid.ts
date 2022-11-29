import { CID } from 'multiformats/cid'
import * as raw from 'multiformats/codecs/raw'
import { sha256 } from 'multiformats/hashes/sha2'

export async function getCid(fileContent: Buffer): Promise<string> {
  const hash = await sha256.digest(fileContent)
  return CID.create(1, raw.code, hash).toString()
}
