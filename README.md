# @diograph/file-generator

## Install

```
npm install @diograph/file-generator
# or
yarn add @diograph/file-generator
```

## Usage

```
import { generateDiory } from '@diograph/file-generator'
const diory = await generateDiory(filePath)
console.log('Hello diory!', diory.toObject())
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

## Publish

Create new version and publish to npm:

```
yarn publish
```
