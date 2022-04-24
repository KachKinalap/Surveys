import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';
import Login from "./Login";
import AppRouter from "./AppRouter";

const LoginRouter = () => {
    const [isAuth, setIsAuth] = useState(false)

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
                            setIsAuth={ setIsAuth }
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
