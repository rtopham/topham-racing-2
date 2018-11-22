import React, {Component} from 'react'
import {Panel,ListGroup, ListGroupItem} from "react-bootstrap"
//import icupLogo from './../assets/logos/icup.jpg'
//import mwLogo from './../assets/logos/midweek.jpg'
//import USACLogo from './../assets/logos/USAC.png'
//import USCSLogo from './../assets/logos/uscs.jpg'
//import chainRing from './../assets/logos/chainring.jpg'
import "./Race.css"

class LastRace extends Component {

  render() {
    let logo ='';
    switch (this.props.race.series){
      case "Intermountain Cup": logo='/logos/icup.jpg'
      break
      case "Mid-Week": logo= '/logos/midweek.jpg'
      break
      case "USAC": logo = '/logos/USAC.png'
      break
      case "Utah State Championship Series": logo='/logos/uscs.jpg'
      break
      default: logo='/logos/chainring.jpg'
      break

    }

    return (
      <Panel className="lastRacePanel">
        <Panel.Heading><Panel.Title componentClass="h2">Last Race: {this.props.race.race_date.substring(0,10)}</Panel.Title></Panel.Heading>
        <Panel.Body>
        <ListGroup>
          <img alt="Series Logo" className="lastRaceLogo" src={logo}/>&nbsp;&nbsp;<span className="raceName">{this.props.race.race_name}</span>
          <ListGroupItem>Rank: {this.props.race.rank}</ListGroupItem>
          <ListGroupItem>Time: {this.props.race.time}</ListGroupItem>
          <ListGroupItem>Category: {this.props.race.category}</ListGroupItem>
        </ListGroup>

        </Panel.Body>
      </Panel>




      
    )
  }


}

export default LastRace
