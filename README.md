# @diograph/file-generator

## Install

```
npm install @diograph/file-generator
# or
yarn add @diograph/file-generator
```

## Usage

```
import { generateFileDiory } from '@diograph/file-generator'
const fileDiory = await generateFileDiory(filePath)
console.log('Hello File!', fileDiory.toObject())
```

## Development

Compile typescript in real time to `/dist` folder:

```
yarn build-watch
```

Run unit tests in the background:

```
yarn test-watch
```
