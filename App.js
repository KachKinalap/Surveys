import { StyleSheet, Text, SafeAreaView } from 'react-native';
import LoginRouter from "./src/components/LoginRouter";
import React from 'react'
import { Provider } from "react-redux";
import { Store } from "./src/redux/store";

export default function App() {
  return (
      <Provider store={ Store }>
    <SafeAreaView style={styles.container}>
      <LoginRouter/>
    </SafeAreaView>
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
