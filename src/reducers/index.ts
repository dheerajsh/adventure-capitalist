import { combineReducers } from 'redux'
import { balanceReducer } from '../reducers/balance'
import { businessReducer } from '../reducers/businesses'
import { StoreState } from '@store/StoreState'

export const rootReducer = combineReducers<StoreState.All>({
    account: balanceReducer,
    businesses: businessReducer
})
