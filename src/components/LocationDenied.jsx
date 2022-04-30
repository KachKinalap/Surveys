import React from 'react';
import {Text, StyleSheet, SafeAreaView, Image, Dimensions} from 'react-native';
import { t } from "i18n-js";

const LocationDenied = () => {
    return (
        <SafeAreaView style={styles.cont}>
            <Image style={styles.img}
                   source={require('../assets/images/locationDenied.png')}
                   resizeMode='contain'
            />
            <Text style={styles.text}>{t("LocationDenied.placeholder")}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    cont: {
        width:'100%',
        height:'100%',
        justifyContent:'space-around'
    },
    img: {
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.4,
        alignSelf:'center',
        marginTop:40
    },
    text:{
        fontSize:24,
        padding:20,
        marginBottom:40
    }
});

export default LocationDenied;
