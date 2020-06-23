import * as React from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Figure from 'react-bootstrap/Figure'

import './business.sass'
import { Timer } from '../timer/timer.component'
import { convertMS, formatBusinessValue } from '../../utils'

export enum BusinessState {
    LOCKED = 'locked',
    UNLOCKED = 'unlocked',
    PURCHASED = 'purchased'
}

export interface IBusinessProps {
    readonly name?: string
    readonly value?: number
    readonly numberOfBusiness?: number
    readonly madeMoney?: (money: number) => void
    readonly buyBusiness?: (money: number) => void
    readonly incrementBusiness?: (name: string, makeMoneyTimeInMiliSeconds: number) => void
    readonly addBusinessValue?: (name: string, value: number) => void
    readonly overallValue?: number
    readonly state?: BusinessState
    readonly makeMoneyTimeInMiliSeconds?: number
    readonly hasActiveManager?: boolean
}

export interface IBusinessState {
    readonly state: BusinessState
    readonly minutes: number
    readonly seconds: number
    readonly currentValue?: number
    readonly progressPercentage?: number
    readonly numberOfBusiness?: number,
    readonly canMakeMoney?: boolean
    readonly managerStarted?: boolean
}

export class Business extends React.Component<IBusinessProps, IBusinessState> {

    constructor(props: IBusinessProps) {
        super(props)
        const { minute, seconds} = convertMS(props.makeMoneyTimeInMiliSeconds)
        this.state = {
            currentValue: (this.props.value) * (this.props.numberOfBusiness),
            minutes: minute,
            seconds: seconds,
            progressPercentage: 0,
            numberOfBusiness: props.numberOfBusiness,
            canMakeMoney: true,
            state: this.getCurrentState(),
        }
    }

    componentDidUpdate(prevProp: IBusinessProps) {
        if (this.props.overallValue !== prevProp.overallValue && this.state.state !== BusinessState.PURCHASED) {
            this.setState({
                state: this.props.overallValue >= this.props.value ? BusinessState.UNLOCKED : BusinessState.LOCKED,
            })
        }
        if (this.props.value !== prevProp.value) {
            this.setState({
                currentValue: this.state.numberOfBusiness * this.props.value
            })
        }
        if (this.props.hasActiveManager && !this.state.managerStarted) {
            this.startManager()
            this.setState({
                managerStarted: true
            })
        }
    }

    componentDidMount() {
        if (this.props.hasActiveManager && !this.state.managerStarted) {
            this.startManager()
            this.setState({
                managerStarted: true
            })
        }
        this.props.addBusinessValue && this.props.addBusinessValue(this.props.name, this.props.value)
    }

    async startManager() {
        console.log("manager started")
        setInterval(() => {
        this.makeMoney()
        }, this.props.makeMoneyTimeInMiliSeconds);
    }

    getCurrentState(): BusinessState {
        if (this.props.state === BusinessState.PURCHASED) {
            return BusinessState.PURCHASED
        }
        return this.props.value <= this.props.overallValue ? BusinessState.UNLOCKED : BusinessState.LOCKED
    }

    render(): JSX.Element {
        if (this.state.state === BusinessState.LOCKED || this.state.state === BusinessState.UNLOCKED) {
            const variant = this.state.state === BusinessState.LOCKED ? 'secondary' : 'warning'
            return (
                <div className='game'>
                    <Row>
                        <Button variant={variant} disabled={this.state.state === BusinessState.LOCKED} onClick={this.buyBusiness}>
                            <div>
                                {this.props.name}
                            </div>
                            <div>
                                {formatBusinessValue(this.props.value)}
                            </div>
                        </Button>
                    </Row>
                </div>
            );
        }
        else {
            const image = `${this.props.name.split(' ')[0].toLowerCase()}.png`
            const { overallValue, value } = this.props
            return (
                <div className='game'>
                    <Row>
                        <Col xs={1}>
                            <Figure onClick={this.makeMoney}>
                                <Figure.Image
                                    width={171}
                                    height={180}
                                    alt="171x180"
                                    src={image}
                                />
                                <ProgressBar now={this.state.numberOfBusiness*2} variant='success' label={this.state.numberOfBusiness}></ProgressBar>
                            </Figure>
                        </Col>
                        <Col xs={3}>
                            <ProgressBar className='money_progress' now={this.state.progressPercentage} variant='success' animated striped label={this.state.currentValue} />
                            <div className='buy'>
                                <Button variant='warning' className='buy_button' disabled={overallValue < value} onClick={this.buyBusiness}>
                                    BUY x1/${value}
                                </Button>
                                <Button variant='secondary' disabled>
                                    <Timer minutes={this.state.minutes} seconds={this.state.seconds}></Timer>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
    readonly buyBusiness = () => {
        this.props.buyBusiness(this.props.value)
        this.props.incrementBusiness(this.props.name, this.props.makeMoneyTimeInMiliSeconds)
        this.setState({
            currentValue: this.state.currentValue + this.props.value,
            numberOfBusiness: this.state.numberOfBusiness + 1,
            state: BusinessState.PURCHASED
        })
    }

    readonly decreamentTimer = (timer, progress) => {
        const { seconds, minutes, progressPercentage, currentValue} = this.state
        this.setState({
            canMakeMoney: false
        })
        if (seconds > 0) {
            this.setState({
                seconds: seconds - 1,
                progressPercentage: progressPercentage+progress
            })
        }
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(timer)
                this.props.madeMoney(currentValue)
                const { minute, seconds} =convertMS(this.props.makeMoneyTimeInMiliSeconds)
                this.setState({
                    seconds: seconds,
                    minutes: minute,
                    progressPercentage: 0,
                    canMakeMoney: true
                })
            } else {
                this.setState({
                    minutes: minutes - 1,
                    seconds: 59
                })
            }
        }
    }

    readonly makeMoney = () => {
        if (this.state.canMakeMoney) {
            const { makeMoneyTimeInMiliSeconds } = this.props

            const progress = (100 / (makeMoneyTimeInMiliSeconds / 1000));
            const decreamentTimer = this.decreamentTimer.bind(this)
            const startTimer = setInterval(() => {
                decreamentTimer(startTimer, progress)
            }, 1000);
        }
    }

}
