# LITE CERTIFIED BLOCK
## Building Blocks React Native Mobile - FileAttachment

Building Blocks - React Native Master App - FileAttachment

## Getting Started

cd packages/blocks/FileAttachment/
yarn install

### Prerequisites

User can upload and update a FileAttachment.
File List page should show Uploaded files if uploaded before else should show button that will navigate to File Upload Screen.
File List card will contain Delete, Download and Edit button.
Delete button will delete the uploaded file and remove it from the list.
Download button will download the file on device and then View button will be enabled. By clicking on view button, user can view the uploaded file.
Edit button will navigate user to Update File Screen.
File Upload screen will have Description and Tag textinput and document type Selector, and upload/update button
File Update button with be shown when user is editing previously updated file.
Core Story Id: 872820

### Git Structure

ZeehanFileAttachment branch is based on the master branch

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

cd packages/blocks/FileAttachment

yarn test

## CI/CD Details

- CI/CD runs fine with all the pipelines
- All the Pipelines pass through all the processes

## Versioning

Tag 0.0.1

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).
