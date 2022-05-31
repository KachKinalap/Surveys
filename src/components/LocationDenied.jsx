import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, Image, Dimensions, AppState} from 'react-native';
import MyButton from "../UI/MyButton";
import { t } from "i18n-js";
import * as Linking from "expo-linking";
import * as Location from 'expo-location';

const LocationDenied = (props) => {
    const [appState, setAppState] = useState(AppState.currentState);
    const [serviceEnabled, setServiceEnabled] = useState(false);

    useEffect(()=>{
        const servInterval = setInterval(async()=>{
            const serviceEnabled = await Location.hasServicesEnabledAsync();
            if(serviceEnabled)
                setServiceEnabled(true)
        },2000)
        return(()=>{
            clearInterval(servInterval)
        })
    },[])

    useEffect(async ()=>{
        Location.getForegroundPermissionsAsync().then(async(res)=>{
            if(res.granted === true && res.status === "granted"){
                if(serviceEnabled)
                    props.setIsLocationGranted(true);
            }
        });
    },[appState, serviceEnabled]);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            setAppState(nextAppState);
        });
        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <View style={styles.cont}>
            <Image style={styles.img}
                   source={require('../assets/images/locationDenied.png')}
                   resizeMode='contain'
            />
            <Text style={styles.text}>{t("LocationDenied.placeholder")}</Text>
            <MyButton title={t("LocationDenied.button")} onPress={()=>{Linking.openSettings()}}/>
        </View>
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
