import React, {useState, useMemo, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, Alert, Image} from 'react-native'
import {getId} from "../utils/genId";
import Multiple from "../UI/Multiple";
import Single from "../UI/Single";
import Open from "../UI/Open";
import MyButton from "../UI/MyButton";
import { sendSurvey } from "../API/postService";
import Loader from "../UI/Loader";
import { useSelector, useDispatch } from "react-redux";
import { setQueue } from "../redux/queue/queueActions";

const ActiveSurvey = (props) => {

    const survey = useSelector( state => state.surveyReducer.survey )
    const dispatch = useDispatch()
    const beginForQ = useMemo(() => new Date(), [survey]);

    if(survey.questions.length === 0){
        return (
            <View style={styles.mainCont}>
                <Text style={styles.popupText}>
                    К сожалению, в этом опросе нет вопросов
                </Text>
                <Image
                    style={styles.emptyImage}
                    source={require('../assets/images/empty.png')}
                    resizeMode='contain'
                />
                <MyButton
                    title={"К списку"}
                    onPress={()=>{
                        props.navigation.navigate('Surveys')
                    }}

                />
            </View>
        );
    }
    else{
        const { accessToken, refreshToken } = useSelector( state => state.tokensReducer )
        //состояние для статуса загрузки
        const [statusText, setStatusText] = useState('')
        const [statusVisible, setStatusVisible] = useState(false)

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
        const [type, setType] = useState(survey?.questions[currInd]?.type ?? 'none')

        //устанавливаем тот самый тип таким образом:
        useMemo(() => setType(survey?.questions[currInd]?.type ?? 'none'), [currInd])

        //формирование ответного запроса с пройденным опросом
        const [filledSurvey, setFilledSurvey] = useState({
            id:survey.id,
            instanceId:getId(),
            latitude: props.route.params.location.coords.latitude,
            longitude: props.route.params.location.coords.longitude,
            beginDate:new Date(),
            endDate:new Date(),
            completed:false,
            questions:[]
        })

        const addToQueue = async(surveyCurr)=>{
            const surveyToQueue = {surveyCurr, additional:{title:survey.title, description:survey.description}}
            await dispatch( setQueue( surveyToQueue ) )
        }

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
                                            sendSurvey(accessToken, totalRes)
                                                .then((resolve)=>{
                                                    //успех
                                                    setLoading(false)
                                                    setStatusText('Опрос успешно отправлен, дождитесь перенаправления.')
                                                    setStatusVisible(true)
                                                    setTimeout(()=>{
                                                        props.navigation.navigate('Surveys')
                                                    },2000)
                                                    //ошибка
                                                }, async(reject)=>{
                                                    addToQueue(totalRes).then(
                                                    //успех
                                                    ()=>{
                                                        setStatusText('При отправке возникла ошибка. Опрос перенаправлен в очередь.')
                                                    },
                                                    //неудача
                                                    ()=>{
                                                        setStatusText('Ошибка при отправке и помещении в очередь. Пройдите тест ещё раз.')
                                                    }
                                                    )
                                                    setLoading(false)
                                                    setStatusVisible(true)
                                                    setTimeout(()=>{
                                                        props.navigation.navigate('Surveys')
                                                    },2000)
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
                                    <Text style={styles.titleQ}>{survey.questions[currInd].title}</Text>
                                </View>
                                {
                                    //логика для вариантов ответа ниже
                                }
                                {statusVisible
                                    ?
                                    <View style={styles.popup}>
                                        <Text style={styles.popupText}>{statusText}</Text>
                                    </View>
                                    :
                                    console.log('')
                                }
                                <ScrollView style={styles.answCont}>
                                    {

                                        type === "multiple"
                                            ?
                                            <Multiple
                                                data={survey.questions[currInd].answers}
                                                askID={survey.questions[currInd].id}
                                                result={filledSurvey}
                                                setResult={setFilledSurvey}
                                                create={beginForQ}
                                            />
                                            :
                                            type === "single"
                                                ?
                                                <Single
                                                    askID={survey.questions[currInd].id}
                                                    data={survey.questions[currInd].answers}
                                                    result={filledSurvey}
                                                    setResult={setFilledSurvey}
                                                    create={beginForQ}
                                                />
                                                :
                                                <Open
                                                    askID={survey.questions[currInd].id}
                                                    ansID={survey.questions[currInd].answers[0].id}
                                                    askText={survey.questions[currInd].answers[0].text}
                                                    result={filledSurvey}
                                                    setResult={setFilledSurvey}
                                                    create={beginForQ}
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
                                        (currInd===survey.questions.length-1)
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
                                                }}
                                            />
                                    }
                                </View>
                            </View>
                            :
                            //тут проверяем готовность
                            <View style={styles.readyScreen}>
                                <Text style={{fontSize:24, textAlign:'center'}}>Вы готовы к прохождению опроса?</Text>
                                <MyButton title={'Начать'} onPress={async()=> {
                                    setIsReady(true)
                                }}/>
                            </View>
                    }
                </View>
        );
    }
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
    },
    popup:{
        flex:1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    popupText:{
        fontSize: 24,
        color:'black',
        textAlign:'center'
    },
    emptyImage:{
        height:'50%',
        marginTop:50
    }
})

export default ActiveSurvey;
