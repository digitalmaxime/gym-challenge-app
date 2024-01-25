# Quick Start

Welcome to gappris. This app aims to replicate Duolinguo, but with modifiable questions and analytics by the professors.
The code starts from `/src` and the highest UI subdivision is `screens`. The data are persisted between screens and components using React Contexts

# Upgrade expo

check if expo-cli is installed, if not 
`npm i -g expo-cli. expo-cli@latest` or something like that
https://docs.expo.dev/more/expo-cli/#installation

than do `expo upgrade`

# Running the app for development

```
yarn
yarn start:cloud
```

Please have a look at the `api` project to know how to use the local emulator for local testing. Otherwise, using `yarn start:cloud` to test and see results with the Firebase cloud server.

# Building app for production

## Versioning

Important configs for builds are found in eas.json file
always increment `version` every time a new version is built and published

## Upload secret keys to EAS

run `eas secret:push --scope project --env-file ./.env.production`
to make sure the build uses the `.env.production` with env `MODE=cloud`
to unable connection to firebase console (cloud)
ref https://docs.expo.dev/build-reference/variables/

## Build APK

run `eas build -p android --profile apk`
to build an apk

## Build AAB

run `eas build -p android --profile aab`
to build an aab for Play Store bundle version
\*\* make sure `versionCode` is incremented in app.json

## Build IAP

To build for iap, make sure you are on macOS.
run `eas build -platform ios --profile production`
to build and iap signed for App Store
\*\* make sure `buildNumber` is incremented in app.json

# Submit app for production

## Play Store

For Play Store, please connect to the Play Console and drag and drop manually the .AAB for a `New Release` in the `Production` tab.

## App Store

For App Store, please use the EAS submit command to upload to App Store Connect, which manages all builds of .IAP

```
eas submit -p ios --latest
```
