import React, {useState, useMemo} from 'react';
import {View, Text, Button, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert} from 'react-native'
import {getId} from "../utils/genId";
import Multiple from "../UI/Multiple";
import Single from "../UI/Single";
import Open from "../UI/Open";
import MyButton from "../UI/MyButton";
import {sendSurvey} from "../API/postService";
import Loader from "../UI/Loader";
import { showSuccess } from "../utils/notices";

const ActiveSurvey = (props) => {

    //состояние для модального окна
    const [modalVisible, setModalVisible] = useState(false)

    //состояние для кольца загрузки
    const [loading, setLoading] = useState(false)

    //состояние для кнопок при финальной отправке, блокировка
    const [finishDisabled, setFinishDisabled] = useState(false)

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
        latitude: props.location.coords.latitude,
        longitude: props.location.coords.longitude,
        beginDate:new Date(),
        endDate:new Date(),
        completed:false,
        questions:[]
    })
    return (
        loading
        ?
        <Loader/>
        :
        <View style={styles.mainCont}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Вы точно хотите закончить тестирование?</Text>
                        <View style={styles.buttonWrap}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={async() => {
                                    setModalVisible(!modalVisible)
                                    setFinishDisabled(true)
                                    setLoading(true)
                                    let totalRes = filledSurvey
                                    totalRes.endDate = new Date()
                                    totalRes.completed = true
                                    showSuccess("Результат успешно отправлен")
                                    sendSurvey(props.token, totalRes)
                                        .then((resolve)=>{
                                            console.log(resolve)
                                            setLoading(false)

                                            // setTimeout(()=>{
                                            //     props.navigation.navigate('Surveys')
                                            // },3000)
                                        })
                                }}
                            >
                                <Text style={styles.textStyle}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
                                        ansID={props.currSurv.questions[currInd].answers[0].id}
                                        askText={props.currSurv.questions[currInd].answers[0].text}
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
                            disabled={(currInd===0) || finishDisabled}
                            onPress={((currInd-1) < 0)?()=>{}:()=>setCurrInd(currInd-1)}
                        />
                        {
                            (currInd===props.currSurv.questions.length-1)
                            ?
                                <MyButton
                                    title={"Завершить"}
                                    disabled={finishDisabled}
                                    onPress={()=>{
                                        setModalVisible(true)
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonWrap:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin:20,
    },
    buttonOpen: {
        backgroundColor: "sandybrown",
    },
    buttonClose: {
        backgroundColor: "sandybrown",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize:20
    }
})

export default ActiveSurvey;
