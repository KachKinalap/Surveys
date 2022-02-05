import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import Loader from "../UI/Loader";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Researches from "./Researches";
import Surveys from "./Surveys";
import { getResearches } from '../API/postService'
import {getCoord} from "../API/geo";
import ActiveSurvey from "./ActiveSurvey";

const AppRouter = (props) => {
    //почему-то из пропсов напрямую токен сохраняться не хочет, что ж, у меня в запасе всегда пара костылей...
    const token = props.accessToken
    //локация
    const [location, setLocation] = useState(null)
    //состояние для кольца загрузки
    const [loading, setLoading] = useState(true)
    //состояние для json получаемых исследований
    const [rsrchs, setRsrchs] = useState('')
    //конкретное исследование, опросы которого будут отображаться при клике на него
    const [currRsch, setCurrRsch] = useState([])
    //конкретный опрос, который будет передаваться в ActiveSurvey для его прохождения
    const [currSurv, setCurrSurv] = useState([])

    useEffect(()=>{
        getCoord().then(
            (result)=>{
                setLocation( result )
            }
        )
    },[])

    useEffect(()=>{
        getResearches(props.accessToken).then((result)=>{
            setRsrchs(result.data.payload.researches)
            setLoading(false)
        })
    },[])

    const Stack = createNativeStackNavigator();
    return (
            loading
            ?
            <View style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100%'}}>
                <Loader/>
            </View>
            :
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name='Researches' options={{ title: 'Researches' }}>
                        {(props) => <Researches {...props} researches={rsrchs} setRsch={setCurrRsch}/>}
                    </Stack.Screen>
                    <Stack.Screen name="Surveys" options={{ title: 'Surveys' }}>
                        {(props) => <Surveys {...props} currRsch={currRsch} setSurv={setCurrSurv} location={location}/>}
                    </Stack.Screen>
                    <Stack.Screen name="ActiveSurvey" options={{ title: 'ActiveSurvey' }}>
                        {(props) => <ActiveSurvey {...props} currSurv={currSurv} token={token}/>}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
    );
};

export default AppRouter;
