import { StyleSheet, Text, SafeAreaView, LogBox } from 'react-native';
import LoginRouter from "./src/components/LoginRouter";
import React from 'react'
import { Provider } from "react-redux";
import { Store } from "./src/redux/store";
import { persistor } from "./src/redux/store"
import { PersistGate } from 'redux-persist/lib/integration/react';
import 'react-native-url-polyfill/auto';

export default function App() {

    LogBox.ignoreLogs(['Warning: ...', 'Looks like']);
  return (
      <Provider store={ Store }>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.container}>
            <LoginRouter/>
          </SafeAreaView>
        </PersistGate>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
