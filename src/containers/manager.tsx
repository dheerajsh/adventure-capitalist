import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Map } from 'immutable'
import { IManagerProps, Manager } from '../components/manager/manager'
import { StoreState } from '../store/StoreState'
import * as actions from '../actions/balance'
import * as businessAction from '../actions/businesses'

export function mapStateToProps({ businesses, account}: StoreState.All, dispatchProps: IManagerProps): IManagerProps {
    // eslint disable-next-line no-undefined
    const businessCount = Map(businesses.businessesMap)
    const business = businessCount.get(dispatchProps.businessName)
    return {
        bought: business && business.hasActiveManager,
        overallValue: account.balance
    }
}

// tslint:disable-next-line:no-any
export function mapDispatchToProps(dispatch: Dispatch<any>, dispatchProps: IManagerProps): object {
    return {
        buyManager: (name: string) => businessAction.buyManager(name),
        payForManager: (value: number) => actions.buy(value)
    }
}
export default connect(mapStateToProps, mapDispatchToProps, null)(Manager)
