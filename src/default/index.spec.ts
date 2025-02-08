import { join } from 'path-browserify'
import { IDiory } from '@diograph/diograph'

import { mockDataClient } from '../testUtils'

import { generateDefaultDiory } from './index'

const fixtures = join(__dirname, '__fixtures__')
describe('generateDefaultDiory', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0)
  })

  it('generates document diory from file', async () => {
    const diory: IDiory = await generateDefaultDiory(
      fixtures,
      '/some-file.txt',
      mockDataClient('some-file.txt', '2023-01-01', '2023-02-02'),
    )

    expect(diory.toObject()).toMatchInlineSnapshot(`
      {
        "created": "2023-01-01T00:00:00.000Z",
        "date": "2023-01-01T00:00:00.000Z",
        "id": "bafkreicyx63q6sifdifzyylo4wpfzf45pzyexarkdd4eoq3qhmkbkzkive",
        "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMPvD6PwAGiwMHcHyXEAAAAABJRU5ErkJggg==",
        "modified": "2023-02-02T00:00:00.000Z",
        "text": "some-file.txt",
      }
    `)
  })
})
