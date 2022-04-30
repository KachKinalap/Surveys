import React, {useEffect, useState} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Settings from "./Settings";
import SurveyRouter from "./SurveyRouter";
import Queue from "./Queue";
import {getCoord} from "../API/geo";
import {getSurveys} from "../API/postService";
import {useSelector, useDispatch} from "react-redux";
import {setLocation} from "../redux/location/locationActions";
import { t } from "i18n-js";

const AppRouter = (props) => {
    const dispatch = useDispatch()
    const { accessToken, refreshToken } = useSelector( state => state.tokensReducer )
    //состояние для кольца загрузки
    const [loading, setLoading] = useState(true)
    //состояние для json получаемых исследований
    const [surveys, setSurveys] = useState('')

    const Tab = createBottomTabNavigator()

    useEffect(()=>{
        try{
            getCoord(props.setIsLocationGranted).then(
                async (result)=> {
                    await dispatch( setLocation(result) )
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
                initialRouteName={t("AppRouter.screenTitles.surveys")}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({color, size }) => {
                        let iconName;

                        if (route.name === t("AppRouter.screenTitles.surveys")) {
                            iconName = 'help-outline'
                        }
                        else if (route.name === t("AppRouter.screenTitles.queue")) {
                            iconName = 'archive-outline'
                        }
                        else if (route.name === t("AppRouter.screenTitles.settings")) {
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
                <Tab.Screen name={t("AppRouter.screenTitles.surveys")} component={()=><SurveyRouter
                                                            surveys={surveys}
                                                            loading={loading}
                                                            token={accessToken}
                                                         />}
                />
                <Tab.Screen name={t("AppRouter.screenTitles.queue")} component={()=><Queue/>} />
                <Tab.Screen name={t("AppRouter.screenTitles.settings")} component={()=><Settings setIsAuth={props.setIsAuth}/>} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppRouter;
