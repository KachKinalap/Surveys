import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    DeviceEventEmitter,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {deleteItemFromQueue, setQueue} from "../redux/queue/queueActions";
import Loader from "../UI/Loader";
import MyButton from "../UI/MyButton";
import {sendSurvey} from "../API/postService";

const Queue = () => {

    DeviceEventEmitter.addListener("task", async (event) => {
        if (event?.success === true) {
            await dispatch( deleteItemFromQueue(event.instanceId) )
        }
        else {
            await dispatch( deleteItemFromQueue(event.instanceId) )
            await dispatch( setQueue( event.surv ) )
        }
        setToggleDeleted(!toggleDeleted)
    })


    const queue = useSelector( state=>state.queueReducer.queue )
    const {accessToken, refreshToken} = useSelector(state => state.tokensReducer)
    const location = useSelector(state => state.locationReducer.location)
    const [toggleDeleted,setToggleDeleted] = useState(false)
    const [loaderMass, setLoaderMass] = useState([])
    const dispatch = useDispatch()

    const fillingLoaderMass = (length, index= -1, filler = '') => {
        const initLoaderMass = [];
        for(let i = 0; i < length; ++i){
            initLoaderMass.push('Отправить');
        }
        if ((index !== -1) && filler) {
            initLoaderMass[index] = filler;
            setLoaderMass(initLoaderMass);
        }
        else if(length) {
            setLoaderMass(initLoaderMass);
        }
        else {
            setLoaderMass([]);
        }
    }

    useEffect(()=>{
        console.log('in useEffect')
        fillingLoaderMass(queue===null?0:queue.length);
    },[]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    queue
                        ?
                        queue.map( (surv, index) =>

                            <SafeAreaView style={styles.containerI}>
                                <TouchableOpacity
                                    style={styles.itemCont}
                                    onPress={async()=>{
                                        console.log("Нажми сильнее, чтобы заработало")
                                    }}
                                >
                                    <Text style={styles.title}>
                                        {surv.additional.title?surv.additional.title:'Без названия'}
                                    </Text>
                                    <Text style={styles.description}>
                                        {surv.additional.description?surv.additional.description:'Без описания'}
                                    </Text>
                                    <View style={styles.contAdditional}>
                                        <Text style={styles.idSurvey}>ID опроса: </Text>
                                        <Text style={styles.valueIDError}>
                                            {surv.surveyCurr.instanceId?surv.surveyCurr.instanceId:'Индекса нет'}
                                        </Text>
                                    </View>
                                    <View style={styles.contAdditional}>
                                        <Text style={styles.idSurvey}>Причина попадания в очередь:</Text>
                                            <Text style={styles.valueIDError}>
                                                {surv.additional.errorSending?surv.additional.errorSending:'Информации нет'}
                                            </Text>
                                    </View>
                                    {surv.additional.error
                                        ?
                                        <Text style={styles.notSent}>
                                            Ошибка отправки в отложенном режиме
                                        </Text>
                                        :
                                        console.log('')
                                    }
                                    <View style={styles.btnsCont}>
                                    <MyButton title={'Удалить'} onPress={async ()=> {
                                        await dispatch( deleteItemFromQueue( surv.surveyCurr.instanceId ) )
                                        setToggleDeleted(!toggleDeleted)
                                    }}/>
                                        <View style={{width:20}}>

                                        </View>
                                    <MyButton title={loaderMass[index]} onPress={()=>{
                                        fillingLoaderMass(queue.length, index, "Отправка...");
                                        setTimeout(()=>{
                                            sendSurvey(accessToken, surv.surveyCurr, location.coords).then((result) => {
                                                if (result.status === 200 || result.status === 201) {
                                                    fillingLoaderMass(queue.length, index, "Успешно", loaderMass);
                                                    setTimeout(() => {
                                                        fillingLoaderMass(queue.length, index, "Отправить", loaderMass);
                                                        dispatch( deleteItemFromQueue( surv.surveyCurr.instanceId ) )
                                                        let newMass = loaderMass;
                                                        newMass.splice(index,1);
                                                        setLoaderMass(newMass)
                                                        setToggleDeleted(!toggleDeleted)
                                                    },1500)
                                                }
                                            }, (reject) => {
                                                console.log(reject);
                                                fillingLoaderMass(queue.length, index, "Ошибка");
                                                setTimeout(() => {
                                                    fillingLoaderMass(queue.length, index, "Отправить");
                                                },1500)
                                            })
                                        }, 2000);
                                    }}/>
                                    </View>
                                </TouchableOpacity>
                            </SafeAreaView>
                        )
                        :
                        queue===null
                            ?
                            <Text style={styles.empty}>Опросов в очереди на отправку нет</Text>
                            :
                            <Loader/>
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',
        height:'100%'
    },
    containerI:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },
    itemCont:{
        borderWidth:3,
        borderColor:'#000',
        borderRadius:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        marginTop:20,
        paddingVertical:30,
        backgroundColor:'white'
    },
    title:{
        fontSize:20,
        color:'sandybrown',
        textAlign:'center',
        paddingHorizontal:10
    },
    description:{
        fontSize:14,
        color:'#000',
        textAlign:'center',
        paddingHorizontal:10
    },
    idSurvey:{
        fontSize:16,
        color:'#000',
        textAlign:'center',
        padding:10
    },
    notEmpty:{
        fontSize:24,
        textAlign:'center',
        paddingHorizontal:20,
        marginVertical:20,

    },
    empty:{
        fontSize:24,
        textAlign:'center',
        paddingHorizontal:20,
        marginTop:300
    },
    notSent:{
        fontSize:14,
        color:'#f00',
        textAlign:'center',
        padding:10
    },
    btnsCont:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    valueIDError: {
        fontSize:16,
        fontWeight:'700',
        textAlign:'center',
        paddingHorizontal:10,
    },
    contAdditional: {
        marginVertical:10
    }
})

export default Queue;
