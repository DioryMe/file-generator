import { executeFfmpegInChildProcess } from './ffmpeg'

import { generateMetadata } from './generateMetadata'

jest.mock('fs/promises', () => ({
  readFile: jest.fn().mockResolvedValue('some-thumbnail-buffer-content'),
}))

const { execFileReturnObjectFixture } = require('./ffmpeg-return-object-fixture')
jest.mock('./ffmpeg')

describe('generateMetadata', () => {
  beforeEach(() => {
    ;(executeFfmpegInChildProcess as jest.Mock).mockResolvedValue({
      tmpPath: 'tmp-path',
      returnObject: execFileReturnObjectFixture,
    })

    process.env.FFMPEG_PATH = 'some-path'
  })

  afterAll(() => {
    delete process.env.FFMPEG_PATH
  })

  describe('given some path', () => {
    it('returns thumbnail buffer', async () => {
      const { thumbnailBuffer } = await generateMetadata('some-path')

      expect(thumbnailBuffer).toEqual('some-thumbnail-buffer-content')
    })

    it('returns metadata string', async () => {
      const { metadataString } = await generateMetadata('some-path')

      expect(metadataString).toEqual(execFileReturnObjectFixture.stderr)
    })
  })

  describe('given no FFMPEG env', () => {
    beforeEach(() => {
      delete process.env.FFMPEG_PATH
    })

    it('throws error', async () => {
      const errorMessage = 'FFMPEG_PATH not defined, video/generateMetadata requires it'
      await expect(generateMetadata('some-path')).rejects.toThrowError(errorMessage)
    })
  })
})
