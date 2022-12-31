import { join } from 'path'

import { generateFileDioryObject } from './index'

describe('generateFileDioryObject', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0);
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockReset();
  })

  it('generates document diory', async () => {
    const filePath = join(__dirname, '/__fixtures__/some-document.pdf')

    const diory = await generateFileDioryObject(filePath)

    expect(diory).toEqual({
      "created": "2022-12-06T21:20:40.304Z",
      "data": [
        {
          "@context": "https://schema.org",
          "@type": "DigitalDocument",
          "contentUrl": filePath,
          "encodingFormat": "application/pdf"
        }
      ],
      "date": "2022-12-06T21:20:40.304Z",
      "id": "bafkreifplif2mdxkjhdsfxe6sxynidybwxkvadck5yazt2wabdidfadq34",
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
      "modified": "2022-12-06T21:20:40.304Z",
      "text": "some-document.pdf"
    })
  })
})
