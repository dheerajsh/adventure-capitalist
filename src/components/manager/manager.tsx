
import * as React from 'react'
import Button from 'react-bootstrap/Button'

export interface IManagerProps {
    readonly value?: number
    readonly businessName?: string
    readonly name?: string,
    readonly buyManager?: (businessName: string) => void,
    readonly payForManager?: (value: number) => void,
    readonly bought?: boolean,
    readonly overallValue?: number
}

export interface IManagerState {
    readonly disabled?: boolean
}

export class Manager extends React.Component<IManagerProps, IManagerState> {

    constructor(props: IManagerProps) {
        super(props)
        this.state = {
            disabled:  props.bought || props.overallValue < props.value
        }
    }
    render() {
        const { value, businessName, name } = this.props
        return (
            <div>
                <div>
                    <div>
                        <div><h3>{name}</h3></div>
                        <div><h6>Runs {businessName}</h6></div>
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

    readonly onBuy = () => {
        const {buyManager, payForManager} = this.props
        buyManager(this.props.businessName)
        payForManager(this.props.value)
        this.setState({
            disabled: true
        })
    }
}
