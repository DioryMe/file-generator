import { join } from 'path'
import { IDiory } from '@diograph/diograph'
import { mockFsStatSync } from '../testUtils'

import { generateDocumentDiory } from './index'

const fixtures = join(__dirname, '__fixtures__')
describe('generateDocumentDiory', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0)

    mockFsStatSync('2023-01-01', '2023-02-02')
  })

  it('generates document diory from pdf', async () => {
    const diory: IDiory = await generateDocumentDiory(fixtures, '/some-document.pdf')

    expect(diory.toObject()).toMatchInlineSnapshot(`
      {
        "created": "2023-01-01T00:00:00.000Z",
        "data": [
          {
            "@context": "https://schema.org",
            "@type": "DigitalDocument",
            "contentUrl": "bafkreifplif2mdxkjhdsfxe6sxynidybwxkvadck5yazt2wabdidfadq34",
            "encodingFormat": "application/pdf",
          },
        ],
        "date": "2023-01-01T00:00:00.000Z",
        "id": "bafkreifplif2mdxkjhdsfxe6sxynidybwxkvadck5yazt2wabdidfadq34",
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
        "modified": "2023-02-02T00:00:00.000Z",
        "text": "some-document.pdf",
      }
    `)
  })

  it('generates document diory from odt', async () => {
    const diory: IDiory = await generateDocumentDiory(fixtures, '/some-document.odt')

    expect(diory.toObject()).toMatchInlineSnapshot(`
      {
        "created": "2023-01-01T00:00:00.000Z",
        "data": [
          {
            "@context": "https://schema.org",
            "@type": "DigitalDocument",
            "contentUrl": "bafkreibmmzu26ak6fu24st2yofgulmv6heqwoqhrwewyfs3wcv25psk2cq",
            "encodingFormat": "application/vnd.oasis.opendocument.text",
          },
        ],
        "date": "2023-01-01T00:00:00.000Z",
        "id": "bafkreibmmzu26ak6fu24st2yofgulmv6heqwoqhrwewyfs3wcv25psk2cq",
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
        "modified": "2023-02-02T00:00:00.000Z",
        "text": "some-document.odt",
      }
    `)
  })

  it('generates document diory from docx', async () => {
    const diory: IDiory = await generateDocumentDiory(fixtures, '/some-document.docx')

    expect(diory.toObject()).toMatchInlineSnapshot(`
      {
        "created": "2023-01-01T00:00:00.000Z",
        "data": [
          {
            "@context": "https://schema.org",
            "@type": "DigitalDocument",
            "contentUrl": "bafkreieqnsym3c5aoh3pyeyy6qb2ib5rkid4dki4qepw3m4lzpgbzszyaq",
            "encodingFormat": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          },
        ],
        "date": "2023-01-01T00:00:00.000Z",
        "id": "bafkreieqnsym3c5aoh3pyeyy6qb2ib5rkid4dki4qepw3m4lzpgbzszyaq",
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
        "modified": "2023-02-02T00:00:00.000Z",
        "text": "some-document.docx",
      }
    `)
  })
})
