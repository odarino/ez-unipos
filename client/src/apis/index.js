import request from 'superagent'

const ROOT_API = process.env.REACT_APP_ROOT_API_URL;

export default class Service {
    static fetchUserInfo(token) {
        return request.get(`${ROOT_API}users/profile`)
               .set('x-unipos-token', token)
               .then((response) => {
                   return response.body
               })
    }

    static postMessage(data, token) {
        return request.post(`${ROOT_API}users/message`)
               .send(data) 
               .set('x-unipos-token', token)
               .then((response) => {
                   return response.body
               })
    }
}