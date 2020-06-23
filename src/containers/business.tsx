import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Map } from 'immutable'

import * as actions from '../actions/balance'
import * as businessAction from '../actions/businesses'
import { IBusinessProps, Business, BusinessState } from '../components/business/business'
import { StoreState } from '../store/StoreState'

export function mapStateToProps({ businesses, account }: StoreState.All,  dispatchProps: IBusinessProps): IBusinessProps {
    // eslint disable-next-line no-undefined
    const businessCount = Map(businesses.businessesMap)
    const business = businessCount.get(dispatchProps.name)
    return {
        numberOfBusiness: business?.count ?? dispatchProps?.numberOfBusiness ??  0,
        overallValue: account.balance,
        state: dispatchProps.state ? dispatchProps.state : business?.state ?? BusinessState.LOCKED,
        hasActiveManager: business && business.hasActiveManager,
        value: business?.value ?? dispatchProps.value
    }
}
// tslint:disable-next-line:no-any
export function mapDispatchToProps(dispatch: Dispatch<any>, dispatchProps: IBusinessProps): object {
    return {
        madeMoney: (amount: number) => actions.add(amount),
        buyBusiness: (amount: number) => actions.buy(amount),
        incrementBusiness: (name: string, makeMoneyTime: number) => businessAction.add(name, makeMoneyTime),
        addBusinessValue: (name:string, value: number) => businessAction.addValue(name, value)
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null)(Business)
