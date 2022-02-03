import * as Location from "expo-location";


export async function getCoord() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        throw new Error('Permission to access location was denied')
    } else {
        return await Location.getCurrentPositionAsync({});
    }
}
