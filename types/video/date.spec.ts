import { getDate } from './date'

const { execFileReturnObjectFixture } = require('./utils/ffmpeg-return-object-fixture')

describe('getDate', () => {

  it('works', async () => {
    const date = await getDate(execFileReturnObjectFixture.stderr)
    expect(date).toEqual('2020-06-30T08:18:22.000000Z')
  })
})
