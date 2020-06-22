
import * as React from 'react'
import Button from 'react-bootstrap/Button'

export interface IUpgraderProps {
    readonly value?: number
    readonly businessName?: string
    readonly name?: string,
    readonly buyUpgrader?: (businessName: string) => void,
    readonly payForUpgrader?: (value: number) => void,
    readonly bought?: boolean,
    readonly overallValue?: number
}

export interface IUpgraderState {
    readonly disabled?: boolean
}

export class Upgrader extends React.Component<IUpgraderProps, IUpgraderState> {

    constructor(props: IUpgraderProps) {
        super(props)
        this.state = {
            disabled:  props.bought || props.overallValue < props.value
        }
    }
    render() {
        const { value, businessName } = this.props
        return (
            <div>
                <div>
                    <div>
                        <div><h6>upgrade {businessName}'s profit 3x</h6></div>
                        <div><h5>${value}</h5></div>
                    </div>
                    <div>
                        <Button variant='warning' disabled={this.state.disabled} onClick={this.onBuy}>
                            {this.props.bought? 'Bought' : 'Buy'}
                         </Button>
                    </div>
                </div>
            </div>
        )
    }

    componentDidUpdate(prevProps: IUpgraderProps) {
        if (prevProps.overallValue !== this.props.overallValue) {
                this.setState({
                    disabled: this.props.bought || this.props.overallValue < this.props.value
                })
        }
    }

    readonly onBuy = () => {
        const {buyUpgrader, payForUpgrader} = this.props
        buyUpgrader(this.props.businessName)
        payForUpgrader(this.props.value)
        this.setState({
            disabled: true
        })
    }
}
