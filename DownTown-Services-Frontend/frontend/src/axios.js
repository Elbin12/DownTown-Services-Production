import axios from 'axios';
import { store } from './redux/store';
import { setWorkerinfo } from './redux/worker';
import { setUserinfo } from './redux/user';

const BASE_URL = process.env.REACT_APP_API_URL
const api = axios.create({ 
    baseURL: BASE_URL,
    withCredentials: true 
 });

 api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            console.log('hi njnnndd', error.response)
            if (error.response.data.user_type){
                if (error.response.data.user_type === 'worker'){
                    store.dispatch(setWorkerinfo(''));
                }else{
                    store.dispatch(setUserinfo(''));
                }
            }
        }
        return Promise.reject(error);
    }
);

const api_key = "356cabade6bf66528dd434b5b92732e8";

export {BASE_URL, api, api_key}