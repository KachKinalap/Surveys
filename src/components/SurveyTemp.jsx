import React from 'react';
import {SafeAreaView, Text, StyleSheet, View, TouchableOpacity} from "react-native";
import { useDispatch } from "react-redux";
import { setSurvey } from "../redux/survey/surveyActions";

const SurveyTemp = (props) => {

    const dispatch = useDispatch()

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.itemCont}
                onPress={async()=>{
                    props.setSurv(props.data)
                    await dispatch( setSurvey( props.data ) )
                    props.navigation.navigate('ActiveSurvey')
                }}
            >
                <Text style={styles.title}>
                    {props.data.title?props.data.title:'Без названия'}
                </Text>
                <Text style={styles.description}>
                    {props.data.description?props.data.description:'Без описания'}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },
    itemCont:{
        borderWidth:3,
        borderColor:'#000',
        borderRadius:10,
        width:'75%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        marginTop:20,
        paddingVertical:30,
        backgroundColor:'white'
    },
    title:{
        fontSize:20,
        color:'sandybrown',
        textAlign:'center',
        paddingHorizontal:10
    },
    description:{
        fontSize:14,
        color:'#000',
        textAlign:'center',
        paddingHorizontal:10
    }
})

export default SurveyTemp;
