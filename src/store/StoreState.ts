import { Map } from 'immutable'
import { BusinessState } from '../components/business/business'
// tslint:disable-next-line:no-namespace
export namespace StoreState {

    export type Account = {
        balance: number,
        lastActiveTime: number,
    }

    export type Business = {
        count: number,
        state: BusinessState,
        hasActiveManager: boolean,
        value: number,
        makeMoneyTime: number

    }
    export type Businesess = {
       businessesMap:  Map<string, Business>
    }

    export type All = {
        readonly account: Account
        readonly businesses? : Businesess
    }
}
