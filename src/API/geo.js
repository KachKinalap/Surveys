import * as Location from "expo-location";


export async function getCoord(setIsLocationGranted) {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        setIsLocationGranted(false);
        throw new Error('Permission to access location was denied');
    } else {
        return await Location.getCurrentPositionAsync({});
    }
}
