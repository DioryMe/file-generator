import { executeFfmpegInChildProcess } from './ffmpeg'
import { readFile } from 'fs/promises'

export async function generateMetadata(sourceFilePath: string, time: number = 3) {
  const pathToFfmpeg = process.env.FFMPEG_PATH
  if (!pathToFfmpeg) {
    throw new Error('FFMPEG_PATH not defined, video/generateMetadata requires it')
  }

  const { returnObject, tmpPath } = await executeFfmpegInChildProcess(pathToFfmpeg, sourceFilePath, time)
  const metadataString: string =  returnObject.stderr

  try {
    const thumbnailBuffer: Buffer = await readFile(tmpPath)
    return { thumbnailBuffer, metadataString }

  } catch (e) {
    console.log(returnObject)
    console.log(e)
    return { metadataString }
  }
}
