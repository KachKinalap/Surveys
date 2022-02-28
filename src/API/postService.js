import axios from "axios";
import { SURV_URL } from "./survURL";

export async function sendSurvey(token, data) {
    let survey = JSON.stringify(data)
    const URL = await SURV_URL()
    try {
        const response = await axios.post(`${URL}survey/filled`, survey, {
            headers: {
                "Authorization":`Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (e) {
        console.log(e.response ?? "");
        if (e.response?.status === 400) {
            throw new Error(`Status: 400, Error: ${JSON.stringify(e.response?.data)}`);
        } else if (e.response?.status === 422) {
            throw new Error(`Status: 422, Error: ${JSON.stringify(e.response?.data)}`);
        } else {
            throw new Error(e.message);
        }
    }
    throw new Error("Something wrong with sending survey");
}

export async function getToken(login, password, IP) {
    try{
        const data = JSON.stringify({"login": login, "password": password})
        const resp = await axios.post(`http://${IP}:8080/api/v1.0/auth/signin`, data, {
            headers: {
                'content-type': 'application/json'
            }
        })
        return resp
    } catch (e) {
        console.log('e.name: ' ,e.name)
        console.log('e.message: ' ,e.message)
        return e
    }
}

export async function getResearches(accessToken) {
    try{
        const authStr = 'Bearer '+ accessToken
        const URL = await SURV_URL()
        const resp = await axios.get(`${URL}research?count=100`, { headers: { Authorization: authStr } })
        console.log('resches\n', resp)
        return resp
    } catch (e) {
        return e
    }
}
