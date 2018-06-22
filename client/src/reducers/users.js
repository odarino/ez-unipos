import { fromJS } from 'immutable';

import { reducerCall } from './index';

const INITIAL_STATE = fromJS({
    loadingInfo: false,
    result: {}
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
        return state
    }
}

export default data;