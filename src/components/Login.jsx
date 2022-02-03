import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { getToken } from '../API/postService'
import MyInput from "../UI/MyInput";
import '@react-navigation/native'
import Loader from "../UI/Loader";


const Login = (props) => {

    const [login, setLogin] = useState('admin')
    const [pass, setPass] = useState('admin')
    const [loading, setLoading] = useState(false)

    const Auth = async (userLogin, password)=> {
        const response =  await getToken(userLogin, password)
        if(response.status === 200){
            props.setAccessToken(response.data.payload.accessToken)
            props.setRefreshToken(response.data.payload.refreshToken)
            setLoading(false)
            props.setIsAuth(true)
        }
    }

    return (
        <View style={styles.container}>
            {loading
                ?
                    <Loader/>
                :
                    <View style={styles.container}>
                        <MyInput
                            value={login}
                            secure={false}
                            label={'Имя пользователя'}
                            onChange={setLogin}
                        />
                        <MyInput
                            value={pass}
                            secure={true}
                            label={'Пароль'}
                            onChange={setPass}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async ()=>{
                                setLoading(true)
                                await Auth(login, pass)
                            }}>
                            <Text style={{fontSize:18, color:'#fff'}}>
                                Enter
                            </Text>
                        </TouchableOpacity>
                    </View>
            }


        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        backgroundColor:'sandybrown',
        width:160,
        height:60,
        margin:30,
        borderRadius:10,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText:{
        flex: 1,
        width:160,
        maxHeight:60,
        resizeMode:'contain',
        marginBottom:60
    }
})

export default Login;
