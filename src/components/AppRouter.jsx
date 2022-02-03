import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import Loader from "../UI/Loader";
import { NavigationContainer , useNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Researches from "./Researches";
import Surveys from "./Surveys";
import { getResearches } from '../API/postService'

const AppRouter = (props) => {

    const [loading, setLoading] = useState(false)
    //состояние для получаемых исследований
    const [rsrchs, setRsrchs] = useState('')

    const navigationRef = useNavigationContainerRef();

    useEffect(()=>{
        getResearches(props.accessToken).then((result)=>{
            setRsrchs(result.data.payload.researches)
        })
    },[])

    const Stack = createNativeStackNavigator();
    return (
            loading
            ?
            <Loader/>
            :
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Researches' options={{ title: 'Researches' }}>
                        {(props) => <Researches {...props} researches={rsrchs} />}
                    </Stack.Screen>
                    <Stack.Screen
                        name="Surveys"
                        component={Surveys}
                    />
                </Stack.Navigator>
            </NavigationContainer>
    );
};

export default AppRouter;
