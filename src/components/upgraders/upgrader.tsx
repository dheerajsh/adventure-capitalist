
import * as React from 'react'
import Button from 'react-bootstrap/Button'
import { formatBusinessValue } from '../../utils'

export interface IUpgraderProps {
    readonly value?: number
    readonly businessName?: string
    readonly buyUpgrader?: (businessName: string, times: number) => void,
    readonly payForUpgrader?: (value: number) => void,
    readonly times?: number,
    readonly overallValue?: number
}

export class Upgrader extends React.Component<IUpgraderProps> {
    render() {
        const { value, businessName, times , overallValue} = this.props
        return (
            <div>
                <div>
                    <div>
                        <div><h6>upgrade {businessName}'s profit {times}x</h6></div>
                        <div><h5>{formatBusinessValue(value)}</h5></div>
                    </div>
                    <div>
                        <Button variant='warning' disabled={overallValue < value} onClick={this.onBuy}>
                            Buy
                         </Button>
                    </div>
                </div>
            </div>
        )
    }

    readonly onBuy = () => {
        const {buyUpgrader, payForUpgrader, businessName, times, value} = this.props
        buyUpgrader(businessName, times)
        payForUpgrader(value)

    }
}
