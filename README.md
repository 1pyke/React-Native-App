# ZenHR App

## ZenHR is a mobile application built with Expo, Expo Router, and TypeScript. It allows users to browse a list of repositories and provides a sign-in feature to save user data using AsyncStorage. The project showcases the benefits of using Expo Router for navigation within an Expo project.

## Base dependencies

- [expo-auth-session]
- [@react-navigation/bottom-tabs]
- [@react-native-async-storage/async-storage]
- [@reduxjs/toolkit]
- [@expo/vector-icons]
- [expo-image-picker]
- [expo-location]
- [expo-updates]
- [react-native-maps]
- [expo-web-browser]

## Features

- Login with username and password
- Login with Google login
- Get all public Repositories
- Search a Repository by name
- Show all user data (name, email, photo, physical location)
- User can change his photo from gallery or camera

## Installation

Before running the application, make sure you have the following software installed on your computer:

- Node.js v18.16.1
- npm
- Expo
  To install the application, clone the repository to your local machine:

```bash
git clone https://github.com/1pyke/React-Native-App.git
```

Then navigate to the project directory and install the required packages:

```bash
cd React-Native-App && npm install
```

# Usage

Before you run the app you should navigate to your index.js you should see

```javascript
 import expo-router/entry
```

this is your root directory it's located in node_modules/expo-router/entry.js navigate to it
and just wrap your application with Redux Provider and give the store property or you could just replace it with the code below

```javascript
import "@expo/metro-runtime";

import { ExpoRoot } from "expo-router";
import Head from "expo-router/head";
import { renderRootComponent } from "expo-router/src/renderRootComponent";
import { Provider } from "react-redux";
import { store } from "../../app/store";

const ctx = require.context(
  process.env.EXPO_ROUTER_APP_ROOT,
  true,
  /.*/,
  process.env.EXPO_ROUTER_IMPORT_MODE
);

// Must be exported or Fast Refresh won't update the context
export function App() {
  return (
    <Provider store={store}>
      <Head.Provider>
        <ExpoRoot context={ctx} />
      </Head.Provider>
    </Provider>
  );
}

renderRootComponent(App);
```

This behavior becuase we are using the expo router insted of the defult stack navigator.

To run the application on a connected device or emulator, use the following command:

```bash
npx expo start
```
