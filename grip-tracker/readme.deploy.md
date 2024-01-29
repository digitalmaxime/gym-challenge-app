# Deploy to Testflight

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
`eas build --profile preview`
run it `eas build:run -p ios` or `eas build:run -p ios --latest`

Validate your code:
`npx -y expo-doctor`

__Important__ : change version number in app.json <--

`eas build --platform ios`

`eas submit -p ios --latest`

✔ Submitted your app to Apple App Store Connect!

ref : https://docs.expo.dev/build/setup/

# Using multiple environment files
https://docs.expo.dev/guides/environment-variables/

maybe use https://www.npmjs.com/package/dotenv-flow