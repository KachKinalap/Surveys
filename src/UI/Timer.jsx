import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

const Timer = (props) => {

//код для динамического отсчёта времени до заданной даты от текущего момента

        // let date = moment().utcOffset('+05:30').format('YYYY-MM-DD hh:mm:ss');
        // //Getting the current date-time with required formate and UTC
        // let expirydate = '2022-12-23 04:00:45'; //You can set your own date-time
        // //Let suppose we have to show the countdown for above date-time
        // let diffr = moment.duration(moment(expirydate).diff(moment(date)));
        // //difference of the expiry date-time given and current date-time
        // let hours = parseInt(diffr.asHours());
        // let minutes = parseInt(diffr.minutes());
        // let seconds = parseInt(diffr.seconds());
        // let d = hours * 60 * 60 + minutes * 60 + seconds;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <CountDown
                    until={props.time}
                    //duration of countdown in seconds
                    timetoShow={('H', 'M', 'S')}
                    //formate to show
                    onFinish={() =>
                        {
                            if(props.setLoading)
                            props.setLoading(false)
                            if(props.setIsDelayOut){
                                props.setIsDelayOut(true)
                                setTimeout(()=>{
                                    props.setIsDelayOut(false)
                                },2500)
                            }

                        }
                    }
                    //on Finish call
                    onPress={() => alert('hello')}
                    //on Press call
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
