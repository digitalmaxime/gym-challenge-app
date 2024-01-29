// // Learn more https://docs.expo.io/guides/customizing-metro
// import { getDefaultConfig } from 'expo/metro-config';

// /** @type {import('expo/metro-config').MetroConfig} */
// const config = getDefaultConfig(__dirname);

// export default config;


const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
