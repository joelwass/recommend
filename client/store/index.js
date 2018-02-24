import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { mainReducer } from './reducers'

const initialState = mainReducer(undefined, {}) // sneaky way to get our full initial state

export const initStore = (state = initialState) => {
  return process.env.NODE_ENV === 'production'
    ? createStore(mainReducer, state, applyMiddleware(thunkMiddleware))
    : createStore(mainReducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
