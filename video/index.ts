import { generateThumbnail } from './thumbnailer'
import { parseFfmpegOutput } from './parse-ffmpeg-output'
import { DioryGeneratorData } from 'diograph-js'

async function dioryVideoGenerator(filePath: string, cid: string): Promise<DioryGeneratorData> {
  const { thumbnailBuffer, ffmpegOutput } = await generateThumbnail(filePath)
  const { date, latlng, duration } = parseFfmpegOutput(ffmpegOutput)

  const typeSpecificDiory = {
    ...(date && { date }),
    ...(latlng && { latlng }),
    data: [
      {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        contentUrl: cid,
        cid,
        ...(duration && { duration }),
        encodingFormat: '',
      },
    ],
  }

  return { typeSpecificDiory, thumbnailBuffer, cid }
}

export { dioryVideoGenerator }
