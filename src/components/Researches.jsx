import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, Button, TouchableOpacity, StyleSheet, View} from 'react-native';
import {getCoord} from '../API/geo';
import Loader from "../UI/Loader";
import Research from "./Research";

const Researches = (props) => {

    const [location, setLocation] = useState(null)
    //const [changer, setChanger] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        getCoord().then(
            (result)=>{
                setLocation( result )
            }
        )
    },[])

    return (
        <SafeAreaView style={styles.container}>
            {
                props.researches
                    ?
                    props.researches.map( (rsch) =>
                            <Research rsch={rsch} navigation={props.navigation}/>
                    )
                    :
                    <Loader/>
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:'sandybrown',
        width:'100%',
        height:'100%'
    },

})

export default Researches;
