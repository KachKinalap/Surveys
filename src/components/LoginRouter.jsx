import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import Login from "./Login";
import AppRouter from "./AppRouter";
import LocationDenied from "./LocationDenied";

const LoginRouter = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [isLocationGranted, setIsLocationGranted] = useState(true)
    return (
        <View style={styles.container}>
                {
                    isAuth
                        ?
                            isLocationGranted
                            ?
                            <AppRouter
                                setIsAuth={ setIsAuth }
                                setIsLocationGranted = { setIsLocationGranted }
                            />
                            :
                            <LocationDenied/>
                        :
                        <Login
                            setIsAuth = { setIsAuth }
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
