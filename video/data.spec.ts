import { getData } from './data'

jest.mock('file-type', () => ({
  fromFile: jest.fn().mockResolvedValue({})
}))

describe('getData', () => {
  it('adds duration', async () => {
    const data = await getData(
      'some-rootPath',
      'some-subPath',
      '  Duration: 00:00:34.56, start: 0.000000, bitrate: 20455 kb/s'
    )

    expect(data && data[0].duration).toEqual('00:00:34.56')
  })
})
