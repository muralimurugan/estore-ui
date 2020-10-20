const initialState = {
    count: 0,
    storeList: [],
    userList: [],
    storeDetail: {}
}
export default function reducer(state=initialState,action){
    switch(action.type) {
        case 'INCREMENT':
            return {
                count: state.count + 1
            }
        case 'FETCH_STORE_SUCCESS':
            return {
                storeList: action.payload
            }
        case 'FETCH_USERS_BY_STORE_SUCCESS':
            return {
                userList: action.payload
            }
        case 'FETCH_STORE_DETAILS_SUCCESS':
            return {
                storeDetail: action.payload
            }
        case 'SET_API_ERROR':
            return {
                errorMessage: action.payload
            }
        default:
            return state;
    }
}