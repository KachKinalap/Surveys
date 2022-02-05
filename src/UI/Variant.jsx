import React, {useState} from 'react';
import {View, SafeAreaView, TouchableOpacity, Text, StyleSheet} from "react-native";

const Variant = (props) => {
    //функция для поиска ответа в конечном массиве, чтобы его удалить
    const isInArray = (i)=>{
        return ((i.id === props.askID) && i.answerId === props.ansID)
    }

    const ind = props.result.questions.findIndex(isInArray)

    //нажата ли кнопка
    const [pressed, setPressed] = useState(ind !== -1)

    return (
        <TouchableOpacity
            style={pressed?styles.varContP:styles.varCont}
            onPress={()=>{
                //логика такая: до изменения состояния нажатия мы смотрим его, далее либо добавляем в общий массив конкретный ответ, либо удаляем его, предварительно найдя
                if(!pressed){
                    const ans = {
                        "id": props.askID,
                        "answerId": props.ansID,
                        //TODO запилить что-то нормальное в дату
                        "createdAt": "2021-12-01T00:00:00.000",
                        "beginDate": "2021-12-01T00:00:00.000",
                        "endDate": "2021-12-31T00:00:00.000",
                        "text": props.textV
                    }
                    const currRes = props.result
                    currRes.questions.push(ans)
                    props.setResult(currRes)
                }
                else{
                    const ind = props.result.questions.findIndex(isInArray)
                    if(ind){
                        const currRes = props.result
                        currRes.questions.splice(1, ind)
                        props.setResult(currRes)
                    }
                }
                setPressed( !pressed )
            }}
        >
            <Text style={styles.varText}>
                {props.textV}
            </Text>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    varCont:{
        padding:10,
        backgroundColor:'#fff',
        borderColor:'sandybrown',
        borderWidth:3,
        borderRadius:10,
        marginVertical:10
    },
    varContP:{
        padding:10,
        backgroundColor:'gray',
        borderColor:'sandybrown',
        borderWidth:3,
        borderRadius:10,
        marginVertical:10
    },
    varText:{
        fontSize:20,
        color:'sandybrown',
        textAlign:'center'
    }
})

export default Variant;
