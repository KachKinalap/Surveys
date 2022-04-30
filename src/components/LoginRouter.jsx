import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import Login from "./Login";
import AppRouter from "./AppRouter";
import LocationDenied from "./LocationDenied";
import { useSelector } from "react-redux";
import i18n from "i18n-js" ;

const LoginRouter = () => {
    const language = useSelector( state => state.languageReducer.language )
    i18n.translations = {
        ru: require("../assets/locales/ru.json"),
        en: require("../assets/locales/en.json")
    };
    i18n.locale = language;
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
