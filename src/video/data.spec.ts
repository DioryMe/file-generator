import { getData } from './data'

describe('getData', () => {
  it('adds duration', async () => {
    const data = await getData(
      '  Duration: 00:00:34.56, start: 0.000000, bitrate: 20455 kb/s',
      'this-is-cid-placeholder',
      'some-mime',
    )

    expect(data && data[0].duration).toEqual('00:00:34.56')
  })
})
