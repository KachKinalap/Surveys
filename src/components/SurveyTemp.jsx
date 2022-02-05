import React from 'react';
import {SafeAreaView, Text, StyleSheet, View, TouchableOpacity} from "react-native";
//разные компоненты для research и survey в случае, если понадобится отображать разные вещи, чтобы не усложнять логику одного компонента, а добавить немного в один из :)
const SurveyTemp = (props, {navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.itemCont}
                onPress={()=>{
                    props.setSurv(props.data)
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
