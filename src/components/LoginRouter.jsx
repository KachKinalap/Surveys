import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import Login from "./Login";
import AppRouter from "./AppRouter";
//import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginRouter = () => {
    const [isAuth, setIsAuth] = useState(false)
    // useEffect(async()=>{
    //     const keys = await AsyncStorage.getAllKeys()
    //     keys.forEach(async (currKey)=>{
    //         await AsyncStorage.removeItem(currKey)
    //     })
    //     console.log(await AsyncStorage.getAllKeys())
    // },[])
    return (
        <View style={styles.container}>
                {
                    isAuth
                        ?
                        <AppRouter
                            setIsAuth={ setIsAuth }
                        />
                        :
                        <Login
                            setIsAuth={setIsAuth}
                        />
                }
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
    }
})

export default LoginRouter;
