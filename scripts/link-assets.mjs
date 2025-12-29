// Workaround for `npx react-native-asset` doing nothing in some environments.
// We import the library by direct file path (avoids Node "exports" issues).

import {linkAssets} from '../node_modules/react-native-asset/esm/main.js';
import fs from 'node:fs/promises';

const rootPath = process.cwd();
const assets = ['./assets/fonts'];

// If manifests already exist (especially if manually edited), react-native-asset may think
// assets are already linked and skip copying. Remove them so linking is forced, then the
// tool will recreate them with correct content.
await Promise.allSettled([
  fs.rm(`${rootPath}/ios/link-assets-manifest.json`, {force: true}),
  fs.rm(`${rootPath}/android/link-assets-manifest.json`, {force: true}),
]);

await linkAssets({
  rootPath,
  shouldUnlink: true,
  platforms: {
    ios: {enabled: true, assets},
    android: {enabled: true, assets},
  },
});


