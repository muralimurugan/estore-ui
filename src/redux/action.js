
import axios from 'axios';
import { API_END_POINT } from './constant';

const headerParams = {
    "x-access-token": localStorage.getItem('jwt')
}

export const fetchStore = () => {
    return function (dispatch) {
        axios.get(`${API_END_POINT}stores`, { headers: headerParams })
            .then(res => {
                console.log('res', res.data.data.stores)
                dispatch(fetchStoreSuccess(res.data.data.stores))
            })
            .catch(err => {
                dispatch(setApiError(err.message))
            })
    }
}
export const fetchUsersByStore = (storeId) => {
    return function (dispatch) {
        axios.get(`${API_END_POINT}users/${storeId}`, { headers: headerParams })
            .then(res => {
                console.log('res', res.data.data.stores)
                dispatch(fetchUsersByStoreSuccess(res.data.data.users))
            })
            .catch(err => {
                console.log(err);
            })
    }
}
export const fetchStoreDetails = (storeId) => {
    return function (dispatch) {
        axios.get(`${API_END_POINT}stores/${storeId}`, { headers: headerParams })
            .then(res => {
                console.log('res', res.data.data.stores)
                dispatch(fetchStoreDetailSuccess(res.data.data.store))
            })
            .catch(err => {
                console.log(err);
            })
    }
}
export const updateStore = (storeId, payload) => {
    return function (dispatch) {
        axios.put(`${API_END_POINT}stores/${storeId}`, { payload }, { headers: headerParams })
            .then(res => {
                dispatch(fetchStore())
            })
            .catch(err => {
                console.log(err);
            })
    }
}
export const deleteStore = (storeId) => {
    return function (dispatch) {
        axios.delete(`${API_END_POINT}stores/${storeId}`, { headers: headerParams })
            .then(res => {
                dispatch(fetchStore())
            })
            .catch(err => {
                console.log(err);
            })
    }
}
export const fetchStoreSuccess = (payload) => {
    return {
        type: 'FETCH_STORE_SUCCESS',
        payload
    }
}
export const fetchUsersByStoreSuccess = (payload) => {
    return {
        type: 'FETCH_STORE_SUCCESS',
        payload
    }
}
export const fetchStoreDetailSuccess = (payload) => {
    return {
        type: 'FETCH_STORE_DETAILS_SUCCESS',
        payload
    }
}
export const setApiError = (payload) => {
    console.log('errormsg', payload)
    return {
        type: 'SET_API_ERROR',
        payload: payload
    }
}