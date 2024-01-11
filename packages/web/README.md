## Getting Started
First, update the dependencies:
```bash
yarn
```

Second, create an .env file and go on the firebase console (https://console.firebase.google.com/u/0/) to add the environment variables.

Then, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## API routes

Because we are using Firebase Hosting, SSR and features like API routes are unavailable. Please use Firebase Cloud Functions to create serverless API call.

## Deployment

To deploy, you need `firebase-tools`. Checkout [https://firebase.google.com/docs/cli](https://firebase.google.com/docs/cli) on the official website of Firebase to see how to install it.

For Windows users, please make sure the environment path is set to your `yarn` folder.

On first time, do the following commands on your computer.
```
yarn global add firebase-tools
```

Now you are ready to deploy, do the following command
```
yarn build
firebase deploy --only hosting
```
