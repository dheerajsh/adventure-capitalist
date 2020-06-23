import {
    ADD,
    ADD_MANAGER,
    ADD_VALUE,
    UPGRADE_BUSINESS,
    businessActionType
} from '../actions/businesses'
import { Map } from 'immutable'
import { StoreState } from '../store/StoreState'
import { BusinessState } from '../components/business/business'


const initialState: StoreState.Businesess = {
    businessesMap: Map()
}

export function businessReducer(state = initialState, action: businessActionType): StoreState.Businesess {
    switch (action.type) {
        case ADD: {
            const businesses = Map(state.businessesMap)
            const business = businesses.get(action.businessName)
            let count = business?.count
            if (!count) {
                count = 0
            }
            count++

            return {
                ...state,
                businessesMap: businesses.set(action.businessName, {
                    ...business,
                    state: BusinessState.PURCHASED,
                    makeMoneyTime: action.makeMoneyTime,
                    count
                })
            }
        }

        case ADD_VALUE: {
            const businesses = Map(state.businessesMap)
            const business = businesses.get(action.businessName)
            return {
                ...state,
                businessesMap: businesses.set(action.businessName, {
                    ...business,
                    value: action.value
                })
            }
        }

        case UPGRADE_BUSINESS: {
            const businesses = Map(state.businessesMap)
            const business = businesses.get(action.businessName)
            const value = business.value
            return {
                ...state,
                businessesMap: businesses.set(action.businessName, {
                    ...business,
                    value: value*action.times
                })
            }
        }

        case ADD_MANAGER: {
            const businesses = Map(state.businessesMap)
            const business = businesses.get(action.businessName)

            return {
                ...state,
                businessesMap: businesses.set(action.businessName, {
                    ...business,
                    hasActiveManager: true
                })
            }
        }

        default:
            return state
    }
}