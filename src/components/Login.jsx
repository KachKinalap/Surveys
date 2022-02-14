import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { getToken } from '../API/postService'
import MyInput from "../UI/MyInput";
import '@react-navigation/native'
import Loader from "../UI/Loader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import {setAccessToken, setRefreshToken} from "../redux/actions";

const Login = (props) => {

    const getIPFromStorage = async()=>{
        const IP = await AsyncStorage.getItem('IPserver')
        if(IP){
            return IP
        }
        return ''
    }

    const Auth = async (userLogin, password, Ip)=> {
        const response =  await getToken(userLogin, password, Ip)
        if(response.status === 200){
            dispatch( setAccessToken(response.data.payload.accessToken) )
            dispatch( setRefreshToken(response.data.payload.refreshToken) )
            AsyncStorage.setItem('IPserver',Ip).then(()=>{
                setLoading(false)
                props.setIsAuth(true)
            })
        }
        else {
            setLoading(false)
            setIsCrashed(true)
            setTimeout(()=>{
                setIsCrashed(false)
            },2500)
        }
    }



    const [IPAddr, setIPAddr] = useState('')
    const [isIPChanged, setIsIPChanged] = useState(false)
    const [isCrashed, setIsCrashed] = useState(false)
    const [initialIP, setInitialIP] = useState('')
    const [login, setLogin] = useState('admin')
    const [pass, setPass] = useState('admin')
    const [loading, setLoading] = useState(false)
    const { accessToken, refreshToken } = useSelector( state => state.tokenReducer )
    const dispatch = useDispatch()
    console.log('accessToken\n', accessToken,`\n`,'refreshToken\n', refreshToken)
    useEffect(()=>{
        getIPFromStorage().then(( res ) => {
            setInitialIP( res )
        })
    },[])


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
                        {initialIP
                        ?
                            console.log('IP is set', initialIP)
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
                            <Text>Неправильный логин, пароль или IP сервера</Text>
                            :
                            console.log('notError')
                        }
                        <TouchableOpacity
                            style={styles.button}
                            onPress={async ()=>{
                                setLoading(true)
                                await Auth(login, pass, initialIP?initialIP:IPAddr)
                                //await AsyncStorage.removeItem('IPserver')
                            }}>
                            <Text style={{fontSize:18, color:'#fff'}}>
                                Enter
                            </Text>
                        </TouchableOpacity>
                        {isIPChanged || !initialIP
                            ?
                            console.log('IPchanging')
                            :
                            <TouchableOpacity
                                style={{marginTop:40}}
                                onPress={()=>{
                                    setInitialIP('')
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
