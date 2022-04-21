import base64 from 'react-native-base64'

export function isTokenRight(tokenCreds) {
    const dividedToken = tokenCreds.split(".")
    const decodedToken = JSON.parse(base64.decode(dividedToken[1]));
    //несоответствие разрядности форматов представления времени, в Date.now() казываются также миллисекунды, отрубаем их
    const now = Date.now().toString().substr(0, 10);
    const value = decodedToken.exp - now;
    console.log(value);
    return value > 0;
}