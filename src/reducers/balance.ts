import {
    ADD,
    WITHDRAW,
    balanceActionType
} from '../actions/balance'
import { StoreState } from '@store/StoreState'


const initialState: StoreState.Account = {
    balance: 2,
    lastActiveTime: new Date().getTime(),
}

export function balanceReducer(state = initialState, action: balanceActionType): StoreState.Account {
    switch (action.type) {
        case ADD:
            return {
                ...state,
                balance: state.balance + action.amount,
                lastActiveTime: new Date().getTime(),
            }
        case WITHDRAW:
            return {
                ...state,
                balance: state.balance - action.amount,
                lastActiveTime: new Date().getTime(),
            }
        default:
            return state
    }
}