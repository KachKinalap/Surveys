import axios from "axios";
import { SURV_URL } from "./survURL";

export async function sendSurvey(token, data) {
    let survey = JSON.stringify(data)
    try {
        const response = await axios.post(`${SURV_URL}survey/filled`, survey, {
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

export async function getToken(login, password) {
    try{
        const data = JSON.stringify({"login": login, "password": password})
        const resp = await axios.post(`${SURV_URL}auth/signin`, data, {
            headers: {
                'content-type': 'application/json'
            }
        })
        return resp
    } catch (e) {
        console.log(e)
    }
}

export async function getResearches(accessToken) {
    try{
        const authStr = 'Bearer '+ accessToken
        const resp = await axios.get(`${SURV_URL}research`, { headers: { Authorization: authStr } })
        return resp
    } catch (e) {
        console.log(e)
    }
}
