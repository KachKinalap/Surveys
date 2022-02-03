import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native'

const Info = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Info</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default Info;
