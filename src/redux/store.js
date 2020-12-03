import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import Collapsed from './reducers/collapsed'
import UserReducer from './reducers/UserReducer'
import PromiseMidlleware from 'redux-promise'
import ThunkMidlleware from 'redux-thunk'
const reducer =combineReducers({
    Collapsed,
    UserReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,composeEnhancers(applyMiddleware(PromiseMidlleware,ThunkMidlleware)))
export default store