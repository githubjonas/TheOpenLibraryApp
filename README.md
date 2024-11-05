# The OpenLibrary App

Limitations due to time constraints for this project has left it with some
important features yet to-do or consider.
- Implement Unit-tests for more components
- Store cached items and details in db instead of AsyncStorage
- Flush cache and refresh button to avoid cached results
- Improve error handling with feedback to user
- Adhere to 'dark mode'
- Translations and accessibility improvements
- Use some UX framework such as Material UI for design/styles
- Click to view high-res version of cover
- Click on details to view More From publisher/author etc.

## WORK LOG
- 2024-10-30 Update local env, code initial navigation [2h]
- 2024-10-31 -
- 2024-11-01 Implementation of API and result page [5h]
- 2024-11-04 Implementation of details page and error feedback [4h]
- 2024-11-05 Finalize documentation and testing, push to GIT [3h]

# Getting Started

## Step 1: Requirements
Local environment for React Native development needs to be up-to-date, see [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup)

## Step 2: Fetch sources
```bash
git clone [TBD]
```

## Step 3: Installation
```bash
npm install
npx pod-install ios
```

## Step 4: Run local simulator
```bash
npm start
```
... and finally run the simulator, for example:
```bash
npx react-native run-ios --simulator="iPhone 16"
```

## Dev

### Update App Logo
#### Install required tools
```bash
npm install -g yo@4.3.1 generator-generator generator-rn-toolbox
brew install imagemagick
```

#### Update Icons & Splash for iOS and Android
```bash
yo rn-toolbox:assets --icon assets/images/AppIcon.png
yo rn-toolbox:assets --splash assets/images/AppSplash.png --ios
yo rn-toolbox:assets --splash assets/images/AppSplash.png --android
```

#### Caveats
##### Unable to start Android emulator?
```bash
export ANDROID_HOME=~/Library/Android/sdk 
```
