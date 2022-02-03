import { StyleSheet, Text, SafeAreaView } from 'react-native';
import LoginRouter from "./src/components/LoginRouter";
import React from 'react'
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <LoginRouter/>
    </SafeAreaView>
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
