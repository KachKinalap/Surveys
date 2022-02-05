import React from 'react';
import { Text, View } from "react-native";
import Variant from "./Variant";

const Multiple = (props) => {
    return (
        props.data.map( (variant) =>
            <Variant
                result={props.result}
                setResult={props.setResult}
                textV={variant.text}
                ansID={variant.id}
                askID={props.askID}
                key={variant.id}
            />
        )
    );
};

export default Multiple;
