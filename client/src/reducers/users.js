import { fromJS } from 'immutable';

import { reducerCall } from './index';

const INITIAL_STATE = fromJS({
    loadingInfo: false,
    result: {},
    message: '',
    messageSuccess: '',
    success: false
})

function data(state = INITIAL_STATE, action) {
    return reducerCall(state, action, reducerClass);
}

class reducerClass{
    static FORCE_LOADING(state, action) {
        return state.updateIn(['loadingInfo'], () => true)
    }

    static GET_USER_INFO_SUCCESS(state, action) { 
        return state.updateIn(['loadingInfo'], () => false)
                    .updateIn(['result'], () => action.response.result)
    }

    static SEND_MESSAGE_SUCCESS(state, action) {
        return state.updateIn(['messageSuccess'], () => 'Send points successully')
    }

    static SEND_MESSAGE_FAILURE(state, action) {
        return state.updateIn(['message'], () => action.response.message)
    }

    static ERASE_ERROR_MESSAGES(state, action) {
        return state.updateIn(['message'], () => '')
    }
}

export default data;