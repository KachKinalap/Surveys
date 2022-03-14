import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import Loader from "../UI/Loader";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Surveys from "./Surveys";
import { getSurveys } from '../API/postService';
import { getCoord } from "../API/geo";
import ActiveSurvey from "./ActiveSurvey";
import { useSelector } from "react-redux";

const SurveyRouter = (props) => {

    const [currSurv, setCurrSurv] = useState([])
    const Stack = createNativeStackNavigator();
    //console.log('SurveysRouter', props.surveys)
    return (
            props.loading
            ?
            <View style={styles.loaderCont}>
                <Loader/>
            </View>
            :
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="Surveys"
                    initialParams={{
                        surveys: props.surveys,
                        setSurv:setCurrSurv,
                        location:props.location,
                    }}
                >
                    {(props) => <Surveys {...props}/>}
                </Stack.Screen>
                <Stack.Screen
                    name="ActiveSurvey"
                    initialParams={{
                        location:props.location,
                        currSurv:currSurv,
                        token:props.token
                    }}
                >
                    {(props) => <ActiveSurvey {...props}/>}
                </Stack.Screen>
            </Stack.Navigator>
    );
};

const styles = StyleSheet.create({
    loaderCont:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        height:'100%'
    }
})

export default SurveyRouter;
