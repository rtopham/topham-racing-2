import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem} from "react-bootstrap"
//import stravaLogo from './../assets/logos/stravaicon.jpg'
import "./Strava.css"

class StravaStatsPanel extends Component {

  
  render() {
    const stravaLogo='/logos/stravaicon.jpg'
    return (
      <Panel className="stravaPanel">
        <Panel.Heading><Panel.Title componentClass="h2">Strava</Panel.Title></Panel.Heading>
        <Panel.Body>
        <ListGroup>
          <img alt="" className="stravaLogo" src={stravaLogo}/>&nbsp;&nbsp;<span className="stravaTitle">{this.props.title}</span>
          <ListGroupItem>Rides: {this.props.stats.totalRides}  </ListGroupItem>
          <ListGroupItem>Distance: {this.props.stats.totalDistance}  </ListGroupItem>
          <ListGroupItem>Time: {this.props.stats.totalTime}  </ListGroupItem>
          <ListGroupItem>Moving Time: {this.props.stats.totalMovingTime}  </ListGroupItem>
          <ListGroupItem>Elevation: {this.props.stats.totalElevation}  </ListGroupItem>

        </ListGroup>

        </Panel.Body>
      </Panel>
     
    )
  }

}

export default StravaStatsPanel
