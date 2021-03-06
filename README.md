# rn-fitness-tracker

React Native library for step tracking based on Google Fit (Android) and CoreMotion (iOS) native API's.

## Installation

`$ npm install @kilohealth/rn-fitness-tracker --save`

or

`$ yarn add @kilohealth/rn-fitness-tracker`

## iOS

#### react-native 0.60.x

1. Add following line to Podfile:
   `pod 'RNFitnessTracker', :podspec => '../node_modules/@kilohealth/rn-fitness-tracker/ios/RNFitnessTracker.podspec'`
2. Add following lines to info.plist file `<dict>` tag:

```xml
<key>NSMotionUsageDescription</key>
<string>Reason string goes here</string>
```

or
open ios project in XCode. Navigated to info.plist file. Add new property list key - `NSMotionUsageDescription`. This will add new line in the containing `Privacy - Motion Usage Description`.

#### manual linking for projects with older react-native version

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `@kilohealth/rn-fitness-tracker` and add `RNFitnessTracker.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNFitnessTracker.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`

## Android

1. To get an OAuth 2.0 Client ID for your project, follow steps in Google Fit [documentation](https://developers.google.com/fit/android/get-api-key).
2. Then in [Google API console](https://console.developers.google.com) find Fitness API and enable it. Download your `google-services.json` file from [firebase console](https://console.firebase.google.com) and place it inside `android/app` directory within your project.
3. Add following dependencies to `android/app/build.gradle` file:

```
implementation 'com.google.android.gms:play-services-fitness:16.0.1'
implementation 'com.google.android.gms:play-services-auth:16.0.1'
```

#### react-native 0.60.x

React Native autolinking will handle the rest.

#### manual linking for projects with older react-native version

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
   Add `import com.fitnesstracker.RNFitnessTrackerPackage;` to the imports at the top of the file.
   Add `new RNFitnessTrackerPackage()` to the list returned by the `getPackages()` method.

2. Append the following lines to `android/settings.gradle`:

```
include ':@kilohealth-rn-fitness-tracker'
project(':@kilohealth-rn-fitness-tracker').projectDir = new File(rootProject.projectDir, 	'../node_modules/@kilohealth/rn-fitness-tracker/android')
```

3.Insert the following lines inside the dependencies block in `android/app/build.gradle`:

```
implementation project(path: ':@kilohealth-rn-fitness-tracker')
```

[API Methods documentation](api.md)

## Usage

```javascript
import RNFitnessTracker from 'rn-fitness-tracker';

//Check if this app has a permission to track steps
//this function can only be used on iOS.
//Status - String (
// 'authorized'/
// 'notDetermined'/
// 'denied'/
// 'restricted'/
// 'unauthorized'/
// 'undefined')
RNFitnessTracker.isAuthorizedToUseCoreMotion(status => {});

//This step is required in order to use any of the methods bellow
//status - boolean
RNFitnessTracker.authorize(status => {});

//get steps today
RNFitnessTracker.getStepsToday(steps => {});

//get 7 days steps
//steps - integer
RNFitnessTracker.getWeekData(steps => {});

//To get 7 days steps
//data - object
// {
//  '2019-07-08 12:00:00' : 100,
//  '2019-07-07 12:00:00' : 267,
// }
RNFitnessTracker.getDailyWeekData(data => {});
```
