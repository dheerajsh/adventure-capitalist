import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {BusinessState } from '../business/business';
import Business from '../../containers/business';
import Manager from '../../containers/manager';
import Upgrader from '../../containers/upgrader';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export interface IAppProps {
  readonly userMoney?: number
}
export interface IAppState {
  readonly userMoney?: number
}

export class App extends React.Component<IAppProps, IAppState> {

  state = {
    userMoney: this.props.userMoney
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
                <h1>{`$${this.state.userMoney}`}</h1>
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

  getBusinesses() {
    return (<>
      <Business
        name='Lemonade Stand'
        value={2}
        state={BusinessState.PURCHASED}
        numberOfBusiness={1}
        overallValue={this.state.userMoney}
        makeMoneyTimeInMiliSeconds={2000}
      />
       <hr/>
      <Business
        name='News Delivery'
        value={60}
        numberOfBusiness={0}
        overallValue={this.state.userMoney}
        makeMoneyTimeInMiliSeconds={3000}
      />
       <hr/>
      <Business
        name='Car Wash'
        value={7200}
        numberOfBusiness={0}
        overallValue={this.state.userMoney}
        makeMoneyTimeInMiliSeconds={5000}
      />
       <hr/>
       <Business
        name='Pizza Delivery'
        value={58640}
        numberOfBusiness={0}
        overallValue={this.state.userMoney}
        makeMoneyTimeInMiliSeconds={8000}
      />
       <hr/>
       <Business
        name='Donut Shop'
        value={103680}
        numberOfBusiness={0}
        overallValue={this.state.userMoney}
        makeMoneyTimeInMiliSeconds={16000}
      />
    </>);
  }

  getManagers() {
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
              <Manager
                businessName='Lemonade Stand'
                value={2000}
                name='Marcus'
                overallValue={this.state.userMoney}
              />
              <hr/>
               <Manager
                businessName='News Delivery'
                value={10000}
                name='The undertaker'
                overallValue={this.state.userMoney}
              />
               <hr/>
               <Manager
                businessName='Car Wash'
                value={105000}
                name='The Rock'
                overallValue={this.state.userMoney}
              />
               <hr/>
               <Manager
                businessName='Donut Shop'
                value={500500}
                name='Stephani'
                overallValue={this.state.userMoney}
              />
               <hr/>
               <Manager
                businessName='Pizza Delivery'
                value={1005000}
                name='The Dark lord'
                overallValue={this.state.userMoney}
              />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      </Accordion>
    )
  }

  getUpgraders() {
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
              <Upgrader
                businessName='Lemonade Stand'
                value={13000}
                times={3}
                overallValue={this.state.userMoney}
              />
              <hr/>
               <Upgrader
                businessName='News Delivery'
                value={145000}
                times={3}
                overallValue={this.state.userMoney}
              />
               <hr/>
               <Upgrader
                businessName='Car Wash'
                value={305000}
                times={3}
                overallValue={this.state.userMoney}
              />
               <hr/>
               <Upgrader
                businessName='Donut Shop'
                value={607000}
                times={2}
                overallValue={this.state.userMoney}
              />
               <hr/>
               <Upgrader
                businessName='Pizza Delivery'
                value={1005000}
                times={2}
                overallValue={this.state.userMoney}
              />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      </Accordion>
    )
  }

  componentDidUpdate(prevProps: IAppProps): void {
    console.log(prevProps);
    if (prevProps.userMoney!== this.props.userMoney) {
        this.setState({
            userMoney: this.props.userMoney,
        })
    }
}
}

