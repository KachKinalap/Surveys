import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { getToken } from '../API/postService'
import MyInput from "../UI/MyInput";
import '@react-navigation/native'
import Loader from "../UI/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { setAccessToken, setRefreshToken } from "../redux/actions";

const Login = (props) => {
    const [IP, setIP] = useState('10.0.0.100')
    const [login, setLogin] = useState('admin')
    const [pass, setPass] = useState('admin')
    const [loading, setLoading] = useState(false)
    const { accessToken, refreshToken } = useSelector( state => state.tokenReducer )
    const dispatch = useDispatch()

    const Auth = async (userLogin, password, Ip)=> {
        const response =  await getToken(userLogin, password, Ip)
        if(response.status === 200){
            dispatch( setAccessToken(response.data.payload.accessToken) )
            dispatch( setRefreshToken(response.data.payload.refreshToken) )
            props.setAccessToken(response.data.payload.accessToken)
            props.setRefreshToken(response.data.payload.refreshToken)
            AsyncStorage.setItem('IPserver',Ip).then(()=>{
                setLoading(false)
                props.setIsAuth(true)
            })

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
                        <MyInput
                            value={IP}
                            secure={false}
                            label={'IP сервера API и БД'}
                            onChange={setIP}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async ()=>{
                                setLoading(true)
                                await Auth(login, pass, IP)
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
