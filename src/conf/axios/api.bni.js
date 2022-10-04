import * as axios from 'axios';
import cookies from "js-cookie";

const apiBni = axios.create({
    baseURL : process.env.REACT_APP_SERVER_NAME+"/api",
    headers: {
        'Content-Type': 'application/ld+json',
        Authorization: "Bearer " + cookies.get("BEARER")
    },
});

export const apiBni_Parser = axios.create({
    baseURL : process.env.REACT_APP_SERVER_NAME+"/api",
    headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: "Bearer " + cookies.get("BEARER")
    },
});

export default apiBni;