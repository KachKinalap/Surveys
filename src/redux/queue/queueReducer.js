import { SET_QUEUE } from "./queueActions";
import { DELETE_ITEM_FROM_QUEUE } from "./queueActions";
import { DELETE_ALL_FROM_QUEUE } from "./queueActions";
//import AsyncStorage from '@react-native-async-storage/async-storage';
const initialStateQueue = {
    queue:null
}

const queueReducer = ( state = initialStateQueue, action )=>{
    switch ( action.type ) {
        case SET_QUEUE:
            if(state.queue === null){
                const newQueue = []
                newQueue.push(action.payload)
                //await AsyncStorage.setItem('queue', JSON.stringify(newQueue))
                return { ...state, queue:newQueue }
            }
            else{
                //const currQueue = JSON.parse(await AsyncStorage.getItem('queue'))
                //currQueue.push(action.payload)
                //await AsyncStorage.setItem('queue', JSON.stringify(currQueue))
                return { ...state, queue: [...state.queue, action.payload] }
            }

        case DELETE_ITEM_FROM_QUEUE:
            const ind = state.queue.findIndex( (item)=>item.surveyCurr.instanceId === action.payload )
            if(ind!==-1) {
                const newQueue = state.queue
                newQueue.splice(ind, 1)
                if(newQueue.length===0){
                    //await AsyncStorage.setItem('queue', JSON.stringify(null))
                    return {queue: null}
                }
                else{
                    //await AsyncStorage.setItem('queue', JSON.stringify(newQueue))
                    return {...state, queue: newQueue}
                }
            }
            else {
                return state
            }

        case DELETE_ALL_FROM_QUEUE:
            //await AsyncStorage.setItem('queue', JSON.stringify(null))
            return {queue: null}

        default:
            return state
    }
}

export { queueReducer };
