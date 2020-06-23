import { connect } from 'react-redux'

import { IAppProps, App } from '../components/app/App'
import { StoreState } from '../store/StoreState'
import { Map } from 'immutable'
import { Dispatch } from 'redux'
import * as actions from '../actions/balance'

export function mapStateToProps({ account, businesses }: StoreState.All): IAppProps {
    // eslint disable-next-line no-undefined
    return {
        userMoney: account.balance,
        lastActiveTime: account.lastActiveTime,
        businesses: Map(businesses.businessesMap)
    }
}

// tslint:disable-next-line:no-any
export function mapDispatchToProps(dispatch: Dispatch<any>, dispatchProps: IAppProps): object {
    return {
        addMoney: (value: number) => actions.add(value)
    }
}
export default connect(mapStateToProps, mapDispatchToProps, null)(App)
