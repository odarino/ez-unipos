import { combineReducers } from "redux";
import $ from 'jquery';

import userReducer from './users';

export const reducers = combineReducers({
    user: userReducer
});

export function reducerCall(state, action, reducerClass) {
    //get the action class method 
    const method = action.type;
    //get all class method 
    //eslint-disable-next-line
    const methods = Object.getOwnPropertyNames(reducerClass).filter(name => {
        if ('length' !== name && 'name' !== name && 'prototype' !== name) {
            return name;
        }
    });
    if ($.inArray(method, methods) !== -1) {
        //clone the state 
        const new_state = cloneObject(state);
        //return static method 
        return reducerClass[method](new_state, action);
    } else {
        //     //there's no valid action, so just return state 
        return state;
    }
}

function cloneObject(object) {
    var clone = $.extend(true, {}, object);
    //return JSON.parse(JSON.stringify(object));
    return clone;
}