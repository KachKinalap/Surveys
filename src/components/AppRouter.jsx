import React from 'react';
import {SafeAreaView} from "react-native-web";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ResearchesRouter from "./ResearchesRouter";
import Settings from "./Settings";

const Tab = createBottomTabNavigator();

const AppRouter = (props) => {

    //TODO сделать IP в redux и запилить проверку сюда, если IP не введён, сначала перекидывать на страницу настроек
//screenOptions={{headerShown: false}}
    return (
            <NavigationContainer>
                <Tab.Navigator
                    initialRouteName={initialComponent}
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({color, size }) => {
                            let iconName;

                            if (route.name === 'Camera') {
                                iconName = 'camera'
                            }
                            else if (route.name === 'History') {
                                iconName = 'time'
                            }
                            else if (route.name === 'Settings') {
                                iconName = 'settings'
                            }
                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color} />;
                        },
                        tabBarActiveTintColor: '#90C900',
                        tabBarInactiveTintColor: 'gray',
                        unmountOnBlur:true
                    })}
                >
                    <Tab.Screen name="Camera" component={()=><CameraView changer={changer} setChanger={setChanger} token={props.token} coord={location}/>}/>
                    <Tab.Screen name="History" component={()=><Gallery token={props.token} coord={location}/>} />
                    <Tab.Screen name="Settings" component={()=><Settings setIsAuth={props.setIsAuth}/>} />
                </Tab.Navigator>
            </NavigationContainer>




    );
};



export default AppRouter;
