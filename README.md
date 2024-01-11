## Getting Started

The project is hosted on Firebase and it is separated in three parts

1. api
2. web
3. mobile

The api is written in NodeJS but compatible for Firebase Cloud Functions. \
The web is written in NextJS, a web framework based on ReactJS, with the ui component Chakra-UI. \
The mobile is written in React Native, for the purpose of cross-platform iOS and Android. There is also the addition of Expo to help publish and develop faster.

## Prerequisite

Please install _nvm_ according to your computer platform Linux/macOS/Windows.

Linux: [https://github.com/nvm-sh/nvm#installing-and-updating](https://github.com/nvm-sh/nvm#installing-and-updating) \
macOS: [https://formulae.brew.sh/formula/nvm](https://formulae.brew.sh/formula/nvm) \
Windows: [https://community.chocolatey.org/packages/nvm](https://community.chocolatey.org/packages/nvm) \

For macOS, please use [Homebrew package manager](https://brew.sh) as it helps manage installation of _nvm_ itself. \
For Windows, please use [Chocolatey package manager](https://docs.chocolatey.org/en-us/choco/setup) as it helps manage installation and management of PATH environment.

#

Then install _NodeJS_ at this specific version and _yarn_ afterward.

```
nvm install 16.17.0
nvm use 16.17.0

npm install -g yarn@1.22.19
```

We will be using _yarn_ as it it faster overall for packages install and runtime.

#

To run each project individually, go to the corresponding folder to run them.

```
cd ./packages/api
yarn
yarn serve
```

```
cd ./packages/web
yarn
yarn dev
```

```
cd ./packages/mobile
yarn
yarn start:cloud
```

#

As required by the client, the UI shown to administrators, professors, and students are to be displayed in **French**.
But for standardisation purposes, the source code is entirely in **English**.


To set environment to production for mobile (using Expo Application Services):
    MY_ENVIRONMENT=production eas update



MOBILE README: [link](https://gitlab.com/polytechnique-montr-al/log89xx/22-3/equipe-5/LOG89XX-5/-/blob/e70ad4137f092cc0658136128f8dcebdf02ffaa0/packages/mobile/readme.md)
