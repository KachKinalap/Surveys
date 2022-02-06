import AsyncStorage from "@react-native-async-storage/async-storage";

export async function SURV_URL() {
    const IP = await AsyncStorage.getItem('IPserver')
    return `http://${IP}:8080/api/v1.0/`
}
