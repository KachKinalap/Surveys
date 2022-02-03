import React from 'react';
import {Text, StyleSheet, SafeAreaView, Button} from 'react-native'

const Surveys = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Surveys</Text>
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

export default Surveys;
