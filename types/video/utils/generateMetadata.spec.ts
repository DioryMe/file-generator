import { generateMetadata } from './generateMetadata'
import { executeFfmpegInChildProcess } from './ffmpeg'

jest.mock('fs/promises', () => ({
  readFile: jest.fn().mockResolvedValue('some-thumbnail-buffer-content')
}))

const { execFileReturnObjectFixture } = require('./ffmpeg-return-object-fixture')
jest.mock('./ffmpeg', () => ({
  executeFfmpegInChildProcess: jest.fn(),
}))

describe('generateMetadata', () => {
  beforeEach(() => {
    ;(executeFfmpegInChildProcess as jest.Mock).mockResolvedValue({
      tmpPath: 'tmp-path',
      returnObject: execFileReturnObjectFixture,
    })

    process.env.FFMPEG_PATH = 'some-path'
  })

  describe('given some path', () => {
    it('returns thumbnail buffer', async () => {
      const returnValue = await generateMetadata('some-path')
      expect(returnValue.thumbnailBuffer).toEqual('some-thumbnail-buffer-content')
    })

    it('returns metadata string', async () => {
      const returnValue = await generateMetadata('some-path')
      expect(returnValue.metadataString).toEqual(execFileReturnObjectFixture.stderr)
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
