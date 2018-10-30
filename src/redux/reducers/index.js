import { combineReducers } from 'redux';
import { testReducer } from './test-reducer';
import { commonReducer } from './common-reducer';

/** Combine all the reducers and export one. */
const integratedReducer = combineReducers({
    testReducer: testReducer,
    commonReducer: commonReducer
});
export default integratedReducer;