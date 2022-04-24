import React, {useEffect, useState} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Settings from "./Settings";
import SurveyRouter from "./SurveyRouter";
import Queue from "./Queue";
import {getCoord} from "../API/geo";
import {getSurveys} from "../API/postService";
import {useSelector} from "react-redux";

const AppRouter = (props) => {

    const { accessToken, refreshToken } = useSelector( state => state.tokensReducer )

    const [location, setLocation] = useState(null)
    //состояние для кольца загрузки
    const [loading, setLoading] = useState(true)
    //состояние для json получаемых исследований
    const [surveys, setSurveys] = useState('')

    const Tab = createBottomTabNavigator()

    useEffect(()=>{
        try{
            getCoord().then(
                (result)=>{
                    setLocation( result )
                    getSurveys(accessToken, result.coords).then((result)=>{
                        setSurveys(result.data.items)
                        setLoading(false)
                    })
                }
            )
        } catch (e) {
            console.log(e)
        }
    },[])

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={'Опросы'}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({color, size }) => {
                        let iconName;

                        if (route.name === 'Опросы') {
                            iconName = 'help-outline'
                        }
                        else if (route.name === 'Ожидание') {
                            iconName = 'archive-outline'
                        }
                        else if (route.name === 'Настройки') {
                            iconName = 'settings'
                        }
                        // Возвращает нужную иконку
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'sandybrown',
                    tabBarInactiveTintColor: 'gray',
                    unmountOnBlur:true
                })}
            >
                <Tab.Screen name="Опросы" component={()=><SurveyRouter
                                                            surveys={surveys}
                                                            location={location}
                                                            loading={loading}
                                                            token={accessToken}
                                                         />}
                />
                <Tab.Screen name="Ожидание" component={()=><Queue/>} />
                <Tab.Screen name="Настройки" component={()=><Settings setIsAuth={props.setIsAuth}/>} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppRouter;
