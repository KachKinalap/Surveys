import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { getToken } from '../API/postService'
import MyInput from "../UI/MyInput";
import '@react-navigation/native'
import Loader from "../UI/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import { setAccessToken, setRefreshToken } from "../redux/tokens/tokensActions";
import { setIP } from "../redux/IPaddress/IPActions";
import Timer from "../UI/Timer";

const Login = (props) => {

    const [IPAddr, setIPAddr] = useState('')
    const [isIPChanged, setIsIPChanged] = useState(false)
    const [isCrashed, setIsCrashed] = useState(false)
    const [isDelayOut, setIsDelayOut] = useState(false)
    const [login, setLogin] = useState('interviewer')
    const [pass, setPass] = useState('interviewer')
    const [loading, setLoading] = useState(false)
    const { accessToken, refreshToken } = useSelector( state => state.tokensReducer )
    const { IPaddress } = useSelector( state => state.IPReducer )
    const dispatch = useDispatch()

    const Auth = async (userLogin, password, Ip)=> {
        const response =  await getToken(userLogin, password, Ip)
        if(response.status === 200){
            await dispatch( setAccessToken(response.data.accessToken) )
            await dispatch( setRefreshToken(response.data.refreshToken) )
            await dispatch( setIP(Ip) )
            await AsyncStorage.setItem('IPserver', Ip)
            setLoading(false)
            props.setIsAuth(true)
        }
        else {
            if(response.message === "Request failed with status code 500"){
                setLoading(false)
                setIsCrashed(true)
                setTimeout(()=>{
                    setIsCrashed(false)
                },5000)
            }
        }

    }

    return (
        <View style={styles.container}>
            {loading
                ?
                <View style={{width:'100%', height:'100%'}}>
                    <Loader/>
                    <Timer
                        setIsDelayOut={setIsDelayOut}
                        setLoading={setLoading}
                        time={20}
                    />
                </View>
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
                        {IPaddress
                        ?
                            console.log(' ')
                        :
                            <MyInput
                            value={IPAddr}
                            secure={false}
                            label={'Адрес подключения'}
                            onChange={setIPAddr}
                            />
                        }
                        {isCrashed
                            ?
                            <Text>Неправильный логин или пароль</Text>
                            :
                            console.log(' ')
                        }

                        {isDelayOut
                            ?
                            <Text>Проблемы с подключением</Text>
                            :
                            console.log(' ')
                        }
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async ()=>{
                                setLoading(true)
                                await Auth(login, pass, IPaddress?IPaddress:IPAddr)
                            }}>
                            <Text style={{fontSize:18, color:'#fff'}}>
                                Enter
                            </Text>
                        </TouchableOpacity>
                        {isIPChanged || !IPaddress
                            ?
                            console.log(' ')
                            :
                            <TouchableOpacity
                                style={{marginTop:40}}
                                onPress={()=>{
                                    //setInitialIP('')
                                    dispatch( setIP('') )
                                    setIsIPChanged(true)
                                }}>
                                <Text style={{fontSize:18, color:'#000'}}>
                                    Изменить IP
                                </Text>
                            </TouchableOpacity>
                        }
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
