import { SafeAreaView, StyleSheet, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import React from 'react'
import { t } from "i18n-js";

const Timer = (props) => {

    return (
        <SafeAreaView style={styles.container}>
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

                        }
                    }
                    onPress={() => alert(t("UI.Timer.attention"))}
                    size={20}
                />
            </View>
        </SafeAreaView>
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
