// import * as FileSystem from 'expo-file-system';
// import { CacheManager } from 'react-native-expo-image-cache';

// export async function cacheImageUri(imageUri: string) {
//   const path = await CacheManager.get(imageUri, {}).getPath();

//   if (path) {
//     const cachedImg = await FileSystem.getInfoAsync(path);
//     if (cachedImg && cachedImg.exists) {
//       console.log(' ... yea, image is cached :)');
//     }
//   } else {
//     console.log(' ... image was not already cached..');
//   }
// }

// export async function deleteCache() {
//   await CacheManager.clearCache();
// }
