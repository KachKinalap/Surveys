import Toast from "react-native-toast-message";

export function showError(message) {
    Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        position: "bottom"
    });
}

export function showSuccess(message) {
    Toast.show({
        type: "success",
        text1: 'Success',
        text2: message,
        position: "bottom"
    });
}
