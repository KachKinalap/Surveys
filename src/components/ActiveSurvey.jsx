import React, {useState, useMemo} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native'
import {getId} from "../utils/genId";
import Multiple from "../UI/Multiple";
import Single from "../UI/Single";
import Open from "../UI/Open";
import MyButton from "../UI/MyButton";
import {sendSurvey} from "../API/postService";

const ActiveSurvey = (props) => {
    //состояние для проверки готовности человека к опросу
    const [isReady, setIsReady] = useState(false)

    //номер текущего вопроса
    const [currInd, setCurrInd] = useState(0)

    //формат текущего вопроса:множественный ответ, одиночный или открытый
    const [type, setType] = useState(props.currSurv.questions[currInd]?.type)

    //устанавливаем тот самый тип таким образом:
    useMemo(() => setType(props.currSurv.questions[currInd]?.type), [currInd])

    //формирование ответного запроса с пройденным опросом
    const [filledSurvey, setFilledSurvey] = useState({
        id:props.currSurv.id,
        instanceId:getId(),
        //TODO изменить хардкод на реальные значения
        latitude: 52.98684246367654,
        longitude: 36.0541413684597,
        //TODO подходит ли такой формат отправляемой даты
        //beginDate:new Date(),
        beginDate:"2021-12-01T00:00:00.000",
        endDate:"",
        completed:false,
        questions:[]
    })
    return (
        <View style={styles.mainCont}>
            {
            isReady
            ?
                <View style={styles.contQ}>
                    {
                        //логика для имени вопроса ниже
                    }
                    <View >
                        <Text style={styles.titleQ}>{props.currSurv.questions[currInd].title}</Text>
                    </View>
                    {
                        //логика для вариантов ответа ниже
                    }
                    <ScrollView style={styles.answCont}>
                        {

                            type === "multiple"
                                ?
                                <Multiple
                                    data={props.currSurv.questions[currInd].answers}
                                    askID={props.currSurv.questions[currInd].id}
                                    result={filledSurvey}
                                    setResult={setFilledSurvey}
                                />
                                :
                                type === "single"
                                    ?
                                    <Single
                                        askID={props.currSurv.questions[currInd].id}
                                        data={props.currSurv.questions[currInd].answers}
                                        result={filledSurvey}
                                        setResult={setFilledSurvey}
                                    />
                                    :
                                    <Open
                                        askID={props.currSurv.questions[currInd].id}
                                        result={filledSurvey}
                                        setResult={setFilledSurvey}
                                    />
                        }
                    </ScrollView>
                    {
                        //логика для кнопок ниже
                    }
                    <View style={styles.buttonCont}>
                        <MyButton
                            title={"Назад"}
                            disabled={currInd===0}
                            onPress={((currInd-1) < 0)?()=>{}:()=>setCurrInd(currInd-1)}
                        />
                        {
                            (currInd===props.currSurv.questions.length-1)
                            ?
                                <MyButton
                                    title={"Завершить"}
                                    onPress={async()=>{
                                        console.log('Типа завершено, чел')
                                        let totalRes = filledSurvey
                                        //totalRes.endDate = new Date()
                                        totalRes.endDate = "2021-12-31T00:00:00.000"
                                        totalRes.completed = true
                                        console.log(totalRes)
                                        sendSurvey(props.token, totalRes)
                                            .then((resolve)=>console.log(resolve))
                                    }}
                                />
                            :
                                <MyButton
                                    title={"Далее"}
                                    onPress={()=>{setCurrInd(currInd+1);
                                    //console.log(filledSurvey)
                                    }}
                                />
                        }
                    </View>
                </View>
            :
                //тут проверяем готовность
                <View style={styles.readyScreen}>
                    <Text style={{fontSize:24, textAlign:'center'}}>Вы готовы к прохождению опроса?</Text>
                    <MyButton title={'Начать'} onPress={()=>setIsReady(true)}/>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    mainCont:{
        width:'100%',
        height:'100%',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    readyScreen:{
        width:'90%',
        height:'90%',
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contQ:{
        width:'90%',
        height:'90%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    titleQ:{
        fontSize:24,
        textAlign:'center'
    },
    buttonCont:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    answCont:{
        maxHeight:'60%'
    }
})

export default ActiveSurvey;
