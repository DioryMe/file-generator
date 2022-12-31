import { join } from 'path'

// Mocks
jest.mock('fs', () => ({
  ...jest.requireActual('fs'),
  statSync: jest.fn().mockReturnValue({
    birthtime: new Date('2023-01-01'),
    mtime: new Date('2023-01-02'),
  }),
}))

import { generateDocumentDiory } from './index'

describe('generateDocumentDiory', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockReset()
  })

  it('generates document diory from pdf', async () => {
    const filePath = join(__dirname, '/__fixtures__/some-document.pdf')

    const diory = await generateDocumentDiory(filePath)

    expect(diory.toObject()).toStrictEqual({
      "created": "2023-01-01T00:00:00.000Z",
      "data": [
        {
          "@context": "https://schema.org",
          "@type": "DigitalDocument",
          "contentUrl": filePath,
          "encodingFormat": "application/pdf",
        },
      ],
      "date": "2023-01-01T00:00:00.000Z",
      "id": "bafkreifplif2mdxkjhdsfxe6sxynidybwxkvadck5yazt2wabdidfadq34",
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
      "modified": "2023-01-02T00:00:00.000Z",
      "text": "some-document.pdf",
    })
  })

  it('generates document diory from odt', async () => {
    const filePath = join(__dirname, '/__fixtures__/some-document.odt')

    const diory = await generateDocumentDiory(filePath)

    expect(diory.toObject()).toStrictEqual({
      "created": "2023-01-01T00:00:00.000Z",
      "data": [
        {
          "@context": "https://schema.org",
          "@type": "DigitalDocument",
          "contentUrl": filePath,
          "encodingFormat": "application/vnd.oasis.opendocument.text",
        },
      ],
      "date": "2023-01-01T00:00:00.000Z",
      "id": "bafkreibmmzu26ak6fu24st2yofgulmv6heqwoqhrwewyfs3wcv25psk2cq",
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
      "modified": "2023-01-02T00:00:00.000Z",
      "text": "some-document.odt",
    })
  })

  it('generates document diory from docx', async () => {
    const filePath = join(__dirname, '/__fixtures__/some-document.docx')

    const diory = await generateDocumentDiory(filePath)

    expect(diory.toObject()).toStrictEqual({
      "created": "2023-01-01T00:00:00.000Z",
      "data": [
        {
          "@context": "https://schema.org",
          "@type": "DigitalDocument",
          "contentUrl": filePath,
          "encodingFormat": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      ],
      "date": "2023-01-01T00:00:00.000Z",
      "id": "bafkreieqnsym3c5aoh3pyeyy6qb2ib5rkid4dki4qepw3m4lzpgbzszyaq",
      "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
      "modified": "2023-01-02T00:00:00.000Z",
      "text": "some-document.docx",
    })
  })
})
