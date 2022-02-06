import React from 'react';
import {SafeAreaView, Text, StyleSheet, View, TouchableOpacity} from "react-native";

const ResearchTemp = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.itemCont}
                onPress={()=>{
                    props.setRsch(props.rsch.surveys)
                    props.navigation.navigate('Surveys')
                }}
            >
                <Text style={styles.title}>{props.rsch.title?props.rsch.title:'Без названия'}</Text>
                <Text style={styles.description}>{props.rsch.description?props.rsch.description:'Без описания'}</Text>
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

export default ResearchTemp;
