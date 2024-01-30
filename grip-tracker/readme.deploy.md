# Deploy to Testflight

## Test your build

Test it in local Production simulation:

`npx expo start --no-dev --minify`

if it fails, try without the --minify

`npx expo start --no-dev`

and

`NODE_ENV=production npx expo start`

maybe need to use `--ios --clear`


If weird errors happen : 
```
delete node_modules
yarn cache clean
yarn
npx expo start --ios --clear
```

Try a production preview: 

`eas build -p ios --profile preview`

`eas build:list`

run it 

`eas build:run -p ios` 

or `eas build:run -p ios --latest`

Validate your code:
`npx -y expo-doctor`

## Build it
https://docs.expo.dev/build/introduction/

__Important__ : change version number in app.json <--

`eas build --platform ios`

## Deploy it

`eas submit -p ios --latest`

✔ Submitted your app to Apple App Store Connect!

ref : https://docs.expo.dev/build/setup/

# Using multiple environment files
https://docs.expo.dev/guides/environment-variables/

maybe use https://www.npmjs.com/package/dotenv-flow

# Push secrets to EAS
https://docs.expo.dev/build-reference/variables/