import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
    DeviceEventEmitter,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {deleteItemFromQueue, setQueue} from "../redux/queue/queueActions";
import SurveyTemp from "./SurveyTemp";
import Loader from "../UI/Loader";
import {setSurvey} from "../redux/survey/surveyActions";
import MyButton from "../UI/MyButton";

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

    const [toggleDeleted,setToggleDeleted] = useState(false)

    const dispatch = useDispatch()

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    queue
                        ?
                        queue.map( (surv) =>
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
                                    <Text style={styles.idSurvey}>
                                        ID опроса: {surv.surveyCurr.instanceId?surv.surveyCurr.instanceId:'Индекса нет'}
                                    </Text>
                                    {surv.additional.error
                                        ?
                                        <Text style={styles.notSent}>
                                            Ошибка отправки в отложенном режиме
                                        </Text>
                                        :
                                        console.log('')
                                    }
                                    <MyButton title={'Удалить'} onPress={async ()=> {
                                        await dispatch( deleteItemFromQueue( surv.surveyCurr.instanceId ) )
                                        setToggleDeleted(!toggleDeleted)
                                    }}/>
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
    }
})

export default Queue;
