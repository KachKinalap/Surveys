import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Login from "./Login";
import AppRouter from "./AppRouter";

const LoginRouter = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')

    return (
        <View style={styles.container}>
                {
                    isAuth
                        ?
                        <AppRouter
                            accessToken={ accessToken }
                            refreshToken={ refreshToken }
                            setIsAuth={ setIsAuth }
                        />
                        :
                        <Login
                            setIsAuth={setIsAuth}
                            setAccessToken={setAccessToken}
                            setRefreshToken={setRefreshToken}
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
