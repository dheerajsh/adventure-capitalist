import store from "../store/Store"

export const ADD = 'balance/ADD'
export const WITHDRAW = 'balance/WITHDRAW'


export function add(amount: number) {
    const action = {
        type: ADD,
        amount
    }
    store.dispatch(action)
}

export function buy(amount: number) {
    const action = {
        type: WITHDRAW,
        amount
    }
    store.dispatch(action)
}

export interface balanceActionType {
    type: typeof ADD | typeof WITHDRAW
    amount: number
}