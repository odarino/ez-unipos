import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';


import { reducers } from "../reducers/index";
import sagas from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const store = createStore(
    reducers,
    enhancer
)

// const createStoreWithMiddleware = compose(
//   applyMiddleware(routerMiddleware(browserHistory), sagaMiddleware)
// )(createStore);
// export const store = createStoreWithMiddleware(reducers, initial_state);

// export const history = syncHistoryWithStore(browserHistory, store);

sagaMiddleware.run(sagas);

export default store