import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Map } from 'immutable'
import { IUpgraderProps, Upgrader } from '../components/Upgrader/Upgrader'
import { StoreState } from '../store/StoreState'
import * as actions from '../actions/balance'
import * as businessAction from '../actions/businesses'

export function mapStateToProps({ businesses, account}: StoreState.All, dispatchProps: IUpgraderProps): IUpgraderProps {
    // eslint disable-next-line no-undefined
    const businessCount = Map(businesses.businessesMap)
    const business = businessCount.get(dispatchProps.businessName)
    return {
        bought: business && business.hasActiveUpgrader,
        overallValue: account.balance
    }
}

// tslint:disable-next-line:no-any
export function mapDispatchToProps(dispatch: Dispatch<any>, dispatchProps: IUpgraderProps): object {
    return {
        buyUpgrader: (name: string) => businessAction.buyUpgrader(name),
        payForUpgrader: (value: number) => actions.buy(value)
    }
}
export default connect(mapStateToProps, mapDispatchToProps, null)(Upgrader)
