import { connect } from 'react-redux'

import { IAppProps, App } from '../components/app/App'
import { StoreState } from '../store/StoreState'

export function mapStateToProps({ account }: StoreState.All): IAppProps {
    // eslint disable-next-line no-undefined
    return {
        userMoney: account.balance
    }
}

export default connect(mapStateToProps, null, null)(App)
