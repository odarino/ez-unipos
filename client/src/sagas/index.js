import { fork } from "redux-saga/effects";
import { put, call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';

import Service from '../apis';
import * as actionTypes from "../actions";

export default function* sagas() {
    yield [
        fork(getUserInfo),
        fork(sendMessage)
    ];
}

//123234
function* callGetUserInfo(action) {
    const response = yield call(Service.fetchUserInfo, action.token);
    yield put({ type: actionTypes.GET_USER_INFO_SUCCESS, response});
}

function* callSendMessage(action) {
    const response = yield call(Service.postMessage, action.data, action.token);
    yield put({ type: actionTypes.SEND_MESSAGE_SUCCESS, response});
}


function* getUserInfo(){
    yield* takeLatest(actionTypes.GET_USER_INFO, callGetUserInfo);
}

function* sendMessage(){
    yield* takeLatest(actionTypes.SEND_MESSAGE, callSendMessage);
}