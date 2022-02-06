import React, {useState, useEffect, useMemo} from 'react';
import { Text, View } from "react-native";
import Variant from "./Variant";

const Multiple = (props) => {

    const create = useMemo(() => new Date(), [props.data]);

    const [begin, setBegin] = useState(new Date())

    useEffect(()=>{
        setBegin(new Date())
    },[props.askID])



    return (
        props.data.map( (variant) =>
            <Variant
                result={props.result}
                setResult={props.setResult}
                textV={variant.text}
                ansID={variant.id}
                askID={props.askID}
                key={variant.id}
                begin={begin}
                create={create}
            />
        )
    );
};

export default Multiple;
