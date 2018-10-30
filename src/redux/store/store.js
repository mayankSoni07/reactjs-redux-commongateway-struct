import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import integratedReducer from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';

const initialState = {}
const enhancers = []
const middleware = [thunk]

if (process.env.NODE_ENV) {
    if (process.env.NODE_ENV === 'development') {
        const devToolsExtension = window.devToolsExtension;
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        }
    }
}

const composedEnhancers = compose(
    ...enhancers,
    applyMiddleware(...middleware, promiseMiddleware(), thunk)
)

const store = createStore(integratedReducer, initialState, composedEnhancers)
export default store;