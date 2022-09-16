import * as axios from 'axios';

const apiFirebase = axios.create({
    baseURL : process.env.REACT_APP_SERVER_NAME+"/api"
});

export default apiFirebase;