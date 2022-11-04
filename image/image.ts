import * as sharp from 'sharp'

const MAX_HEIGHT = 360
const MAX_WIDTH = 480

export async function getImage(imageContent: Buffer): Promise<string | undefined> {
  const imageBugger = await sharp(imageContent)
    .rotate()
    .resize({ width: MAX_WIDTH, height: MAX_HEIGHT, fit: 'inside' })
    // TODO: Detect file format: .png, .gif etc.
    .jpeg()
    .toBuffer()

  return imageBugger && `data:image/jpeg;base64,${imageBugger.toString('base64')}`
}
