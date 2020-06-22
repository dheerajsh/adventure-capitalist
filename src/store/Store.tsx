import { AnyAction, applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from '../reducers/index'
import { StoreState } from './StoreState'

const persistedStateKey = 'gameState'
const persistedStateStr = localStorage.getItem(persistedStateKey)

const persistedState = persistedStateStr ? JSON.parse(persistedStateStr) : {}

// tslint:disable-next-line:no-any no-unsafe-any no-object-mutation
const store = createStore<StoreState.All, AnyAction, any, any>(rootReducer, persistedState,  applyMiddleware(thunk))
store.subscribe(() => {
    localStorage.setItem(persistedStateKey, JSON.stringify(store.getState()))
})

export default store
