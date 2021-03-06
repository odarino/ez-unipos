export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const FORCE_LOADING = 'FORCE_LOADING';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
export const ERASE_ERROR_MESSAGE = 'ERASE_ERROR_MESSAGE';

export function getUserInfo(token) {
    return {
        type: GET_USER_INFO,
        token
    }
}

export function forceLoading() {
    return {
        type: FORCE_LOADING
    }
}

export function sendMessage(data, token) {
    return {
        type: SEND_MESSAGE,
        data,
        token
    }
}

export function eraseMessage() {
    return {
        type: ERASE_ERROR_MESSAGE
    }
}