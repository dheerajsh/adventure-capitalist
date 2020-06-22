import store from "../store/Store"

export const ADD = 'business/ADD'
export const ADD_MANAGER = 'business/ADD_MANAGER'
export const UPGRADE_BUSINESS= 'business/UPGRADE_BUSINESS'


export function add(businessName: string) {
    const action = {
        type: ADD,
        businessName
    }
    store.dispatch(action)
}

export function buyManager(businessName: string) {
    const action = {
        type: ADD_MANAGER,
        businessName
    }
    store.dispatch(action)
}

export function buyUpgrader(businessName: string) {
    const action = {
        type: UPGRADE_BUSINESS,
        businessName
    }
    store.dispatch(action)
}

export interface businessActionType {
    type: typeof ADD | typeof ADD_MANAGER | typeof UPGRADE_BUSINESS
    businessName: string
}