import * as React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export interface IWelcomeBackModalProps {
    readonly show: boolean,
    readonly money: string,
    readonly time: string
}

export interface IWelcomeBackModalState {
    readonly show: boolean,
}

export class WelcomeBackModal extends React.Component<IWelcomeBackModalProps, IWelcomeBackModalState>{
    constructor(props: IWelcomeBackModalProps) {
        super(props);
        this.state = {
            show : props.show
        }
    }
    render() {
        return (
            <Modal
                show={this.state.show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Welcome Back Capitalist
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>You were offline for {this.props.time}</h4>
                    <p>
                        You earned
                    </p>
                    <h4>{this.props.money}</h4>
                    <p>
                        while you were gone
                    </p>
                    <p>
                        Now get in there and maximize those profits, you job creater!
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.onHide}>Okay</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    readonly  onHide = () => {
        this.setState({
        show: false
    })
}
}