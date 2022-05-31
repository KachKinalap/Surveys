import base64 from 'react-native-base64'

export function checkRole(tokenCreds) {
    if(tokenCreds){
        const dividedToken = tokenCreds.split(".")
        const decodedToken = JSON.parse(base64.decode(dividedToken[1]));
        //несоответствие разрядности форматов представления времени, в Date.now() показываются также миллисекунды, отрубаем их
        return decodedToken.role === 'interviewer';
    }
    else {
        return false;
    }

}
