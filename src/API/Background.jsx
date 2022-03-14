import React, {useEffect, useMemo, useReducer, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, DeviceEventEmitter, Platform} from "react-native";
import { sendSurvey } from "./postService";
import {useSelector} from "react-redux";
import {deleteItemFromQueue, setQueue} from "../redux/queue/queueActions";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const keys = JSON.parse(await AsyncStorage.getItem('persist:root'))
    const accessToken = JSON.parse(keys.tokensReducer).accessToken
    const queue = JSON.parse(keys.queueReducer).queue
    console.log('accessTokenBcg:\t',accessToken)
    console.log('queueBcg:\t',queue)
    if (accessToken && queue) {

                queue?.map(async (edge) => {
                    const data = edge.surveyCurr
                    if (data) {
                        try {
                            const result = await sendSurvey(accessToken, data);
                            console.log('afterWorkingBg:\n',result)
                            if (result.status === 200 || result.status === 201) {
                                DeviceEventEmitter.emit("task", {
                                    instanceId:data.instanceId,
                                    success: true
                                });

                                console.log('sent')
                            }
                        } catch (e) {
                            edge.additional.error = true
                            DeviceEventEmitter.emit("task", {
                                instanceId:data.instanceId,
                                surv: edge,
                                success: false
                            });
                            console.log('failed')
                        }
                    }
                })
            }
    return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name, and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 1, // 15 minutes
        stopOnTerminate: false, // android only,
        startOnBoot: true, // android only
    });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

const Background = () => {


    const [isRegistered, setIsRegistered] = React.useState(false);
    const [status, setStatus] = useState(null);

    console.log('isRegistered ', isRegistered)
    console.log('status ', status)
    useEffect(async() => {
        await checkStatusAsync();
    }, []);

    const checkStatusAsync = async () => {
        const status = await BackgroundFetch.getStatusAsync();
        const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
        setStatus(status);
        setIsRegistered(isRegistered);
    };

    const toggleFetchTask = async () => {
        if (isRegistered) {
            await unregisterBackgroundFetchAsync();
        } else {
            await registerBackgroundFetchAsync();
        }

        await checkStatusAsync();
    };


    // const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
    //
    // const processSurveys = async() => {
    //
    //     if (accessToken) {
    //
    //         queue?.map(async (edge) => {
    //             const data = edge.surveyCurr
    //             if (data) {
    //                 try {
    //                     const result = await sendSurvey(accessToken, data);
    //                     //console.log(result)
    //                     if (result.status === 200 || result.status === 201) {
    //                         dispatch( deleteItemFromQueue(data.instanceId) )
    //                     }
    //                 } catch (e) {
    //                     edge.additional.error = true
    //                     dispatch( deleteItemFromQueue(data.instanceId) )
    //                     dispatch( setQueue( edge ) )
    //                 }
    //                 finally {
    //                     DeviceEventEmitter.emit("task", {
    //                         updated:true
    //                     });
    //                 }
    //             }
    //         })
    //     } else {
    //         await stopService();
    //     }
    // }
    //
    //
    // const androidTask = async (taskDataArguments) => {
    //
    //     const { delay } = taskDataArguments;
    //     await new Promise( async (resolve) => {
    //         while (BackgroundService.isRunning()) {
    //             await processSurveys();
    //             await sleep(delay);
    //         }
    //     });
    // };
    //
    //
    // const options = {
    //     taskName: 'SurveysQueue',
    //     taskTitle: 'SurveysQueue',
    //     taskDesc: 'SurveysQueue service',
    //     taskIcon: {
    //         name: 'ic_launcher',
    //         type: 'mipmap',
    //     },
    //     color: 'sandybrown',
    //     parameters: {
    //         delay: 60000, // minute in ms
    //     },
    // };
    //
    // async function stopService() {
    //     await BackgroundService.stop();
    // }
    //
    // async function startService() {
    //     //await BackgroundService.stop();
    //     await BackgroundService.start(androidTask, options);
    // }
    //
    // function isServiceRunning() {
    //     return BackgroundService.isRunning();
    // }
    //
    // const running = useMemo(() => isServiceRunning());
    // const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    //
    // const switchService = async () => {
    //     if (running) {
    //         await stopService();
    //     } else {
    //         await startService();
    //     }
    //     forceUpdate();
    // }

    return (
        <View style={styles.backImage}>
            <Text style={styles.labelItem}>Фоновая {`\n`} отправка</Text>
            <TouchableOpacity
                style={{marginTop:5}}
                onPress={async () => {
                    await toggleFetchTask()
                }}
            >
                <Image source={require('../assets/images/sending.png')}/>
            <Text style={styles.isPowered}>{isRegistered?"Вкл.":"Выкл."}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    backImage: {
        width: 140,
        height: 140,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 50
    },
    labelItem: {
        fontSize: 24,
        color: 'sandybrown',
        fontWeight: '700',
        textAlign:'center'
    },
    isPowered:{
        fontSize: 20,
        color: '#000',
        textAlign:'center'
    }
});

export default Background;
