import { getLatlng } from './latlng'

describe('getLatlng', () => {
  it('fixture location', async () => {
    expect(getLatlng('    location        : +65.4752+027.9785/')).toEqual('65.4752, 27.9785')
  })

  it('mp4 location', async () => {
    expect(getLatlng('    location        : +62.2273+25.8120/')).toEqual('62.2273, 25.8120')
  })
})
