import React, {useState, useEffect} from 'react';
import {Text, View} from "react-native";
import MyInput from "./MyInput";

const Open = (props) => {

    const isInArray = (i)=>{
        return (i.id === props.askID)
    }
    const [ind, setInd] = useState(props.result.questions.findIndex(isInArray))
    const [openA, setOpenA] = useState((ind===-1) ? '' : props.result.questions[ind].text)

    useEffect(()=>{
        const myInd = props.result.questions.findIndex(isInArray)
        setInd(myInd)
        setOpenA((myInd===-1) ? '' : props.result.questions[myInd].text)
    }, [props.askID])

    useEffect(() => {
        const currRes = props.result
        if(ind === -1){
            const ans = {
                "id": props.askID,
                "answerId":"",
                //TODO запилить что-то нормальное в дату
                "createdAt": "2021-12-01T00:00:00.000",
                "beginDate": "2021-12-01T00:00:00.000",
                "endDate": "2021-12-31T00:00:00.000",
                "text": openA
            }
            currRes.questions.push(ans)
        }
        else{
            currRes.questions[ind].text = openA
        }
        props.setResult(currRes)
        setInd(props.result.questions.findIndex(isInArray))
    }, [openA])

    return (
        <View style={{marginTop:'40%'}}>
            <MyInput
                label={'Введите ответ в поле ниже'}
                onChange={setOpenA}
                value={openA}
            />
        </View>
    );
};

export default Open;
