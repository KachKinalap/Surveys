import { StyleSheet, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import React from 'react'
import { t } from "i18n-js";

const Timer = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <CountDown
                    until={props.time}
                    timetoShow={('H', 'M', 'S')}
                    onFinish={() =>
                        {
                            if(props.setLoading)
                                props.setLoading(false)
                            if(props.setIsDelayOut){
                                props.setIsDelayOut(true)
                                setTimeout(()=>{
                                    props.setIsDelayOut(false)
                                },5000)
                            }
                            if(props.setIsIPChanged)
                                props.setIsIPChanged(false)
                        }
                    }
                    onPress={() => alert(t("UI.Timer.attention"))}
                    size={20}
                />
            </View>
        </View>
    );
};

export default Timer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 20,
    },
});
