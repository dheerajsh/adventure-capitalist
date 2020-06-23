import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Business from '../../containers/business';
import Manager from '../../containers/manager';
import Upgrader from '../../containers/upgrader';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { WelcomeBackModal } from '../../components/welcomeBackModal/welcomeBackModal';
import { convertMS, formatCurrency } from '../../utils';
import { StoreState } from '../../store/StoreState'
import { Map } from 'immutable';
import store from '../../store/Store';
import { Provider } from 'react-redux';
import businesses from '../../resources/businesses.json'
import managers from '../../resources/managers.json'
import upgraders from '../../resources/upgraders.json'
export interface IAppProps {
  readonly userMoney?: number,
  readonly lastActiveTime?: number,
  readonly businesses?: Map<string, StoreState.Business>,
  readonly addMoney?: (value: number) => void
}
export interface IAppState {
  readonly userMoney?: number
}

export class App extends React.Component<IAppProps, IAppState> {

  state = {
    userMoney: this.props.userMoney
  }

  componentDidMount() {
    this.showWelcomeBackModalIfRequired()
  }

  render() {
    return (
      <div className="App">
        <div className='App-header'>
          <h3>Adventure captialist</h3>
        </div>
        <Container>
          <Row xs={12}>
            <Col xs={3}>
              User
               {this.getManagers()}
              {this.getUpgraders()}
            </Col>
            <Col xs={9}>
              <div className="money">
                <h1>{formatCurrency(this.state.userMoney)}</h1>
              </div>
              <div>
                {this.getBusinesses()}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  getBusinesses(): JSX.Element {
    const businessess = businesses.map((business) => {
      return (<>
        <Business
        name={business.name}
        value={business.value}
        numberOfBusiness={1}
        overallValue={this.state.userMoney}
        makeMoneyTimeInMiliSeconds={business.makeMoneyTimeInMiliSeconds}
        />
        <hr/>
      </>)

    })
    return (<>
      {businessess}
    </>);
  }

  getManagers(): JSX.Element {
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Managers
          </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {
                managers.map((manager) => {
                  return (<>
                   <Manager
                      businessName={manager.businessName}
                      value={manager.value}
                      name={manager.name}
                      overallValue={this.state.userMoney}
                      />
                  <hr />
                  </>)
                })
              }
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }

  getUpgraders(): JSX.Element {
    return (
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Upgraders
          </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
            {
                upgraders.map((upgrader) => {
                  return (<>
                   <Upgrader
                      businessName={upgrader.businessName}
                      value={upgrader.value}
                      times={upgrader.times}
                      overallValue={this.state.userMoney}
                      />
                  <hr />
                  </>)
                })
              }
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }

  componentDidUpdate(prevProps: IAppProps): void {
    console.log(prevProps);
    if (prevProps.userMoney !== this.props.userMoney) {
      this.setState({
        userMoney: this.props.userMoney,
      })
    }
  }

  showWelcomeBackModalIfRequired() {

    const { diff, madeMoneyWhileOffline } = this.getLastActiveTimeDiffAndMoneyMade()

    console.log(madeMoneyWhileOffline)
    // show modal only if user was away for atleast more then 1 minutes
    if (diff > (1000 * 60) && madeMoneyWhileOffline > 0) {
      // update money created by each manager
      const timeDiff = convertMS(diff)

      const containerElement = document.createElement('div')
      containerElement.setAttribute('id', 'welcome-back-modal')
      document.body.appendChild(containerElement)

      ReactDOM.render(
        <Provider store={store}>
          <WelcomeBackModal
            money={formatCurrency(madeMoneyWhileOffline)}
            time={`${timeDiff.day} Days: ${timeDiff.hour} hours: ${timeDiff.minute} minutes: ${timeDiff.seconds} seconds`}
            show={true}
          />
        </Provider>, document.getElementById('welcome-back-modal'))

      this.props.addMoney(madeMoneyWhileOffline)
    }

  }

  getLastActiveTimeDiffAndMoneyMade() {
    const diff = new Date().getTime() - this.props.lastActiveTime

    //below logic is to find out all the businesses with active manager and then sum up the money made by each.
    const businessWithActiveManagers = this.props.businesses.filter((business) => business.hasActiveManager)
    console.log(businessWithActiveManagers)
    const madeMoneyWhileOffline = businessWithActiveManagers.toList().map((business) => {
      return business.value * (diff/business.makeMoneyTime)
    }).reduce((prev: number, curr: number) => prev + curr)

    return {diff,madeMoneyWhileOffline}
  }
}
