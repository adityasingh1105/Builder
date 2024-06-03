# LITE CERTIFIED BLOCK

## Building Blocks React Native Mobile -  Download

Building Blocks - React Native Master App - Download

## Getting Started
cd packages/blocks/Download/
yarn install

### Prerequisites
Must have a working internet connection

### Git Structure
bb_certification/1241162-Download branch is based on the mater branch

### Installing
iOS
```
  $ yarn
  $ cd packages/mobile/ios && pod install && cd ../../../ && cp node-runners/RCTUIImageViewAnimated.m node_modules/react-native/Libraries/Image/RCTUIImageViewAnimated.m && npx react-native bundle --entry-file ./packages/mobile/index.js --platform ios --dev true --bundle-output ./packages/mobile/ios/main.jsbundle && yarn ios
```

Android - https://docs.expo.io/versions/latest/workflow/android-studio-emulator/
```
  $ yarn
  $ export JAVA_HOME=`/usr/libexec/java_home -v 11`; java -version; export ANDROID_HOME=${HOME}/Library/Android/sdk; export PATH=${PATH}:${ANDROID_HOME}/emulator && yarn android
```

## Running the tests
cd packages/blocks/Download

yarn test 

## CI/CD Details
- CI/CD runs fine with all the pipelines
- All the Pipelines pass through all the processes

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).