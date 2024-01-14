First, update dependencies:
```
yarn
```
You also need to install the firebase CLI:
```
yarn global add firebase-tools
```
Here are some of the used scripts in this project:
```
yarn build: Builds the project

yarn serve: Builds the project and hosts a local firebase emulator suite instance on localhost:4000 (Uses content of exportDir to populate DBs)

yarn export: Exports content of local firebase emulator to exportDir (May need to rename created folder to exportDir)

yarn deploy: Exports firebase functions to the cloud (firebase console application)
```