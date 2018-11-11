import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem} from "react-bootstrap"
import icupLogo from './../assets/logos/icup.png'
import mwLogo from './../assets/logos/midweek.jpg'
import USACLogo from './../assets/logos/USAC.png'
import chainRing from './../assets/logos/chainring.jpg'

class YearToDate extends Component {

  getTimeString(records){
    var totaltime=0;
    
    records.forEach(race => {

        let hms=race.time;
        let a= hms.split(':');
        let seconds = (+a[0]) * 60 *60 + (+a[1]) * 60 + (+a[2]);
        totaltime=totaltime+seconds;
        
    });
    let hoursprefix='';
    let minutesprefix='';
    let secondsprefix='';
    let hours=Math.floor(totaltime/3600);
    let minutes=Math.floor((totaltime-(hours*3600))/60);
    let seconds=totaltime-hours*3600-minutes*60;
    if(hours<10)hoursprefix="0";
    if(minutes<10)minutesprefix="0";
    if(seconds<10)secondsprefix="0";
    return (hoursprefix+hours +':'+ minutesprefix + minutes + ':' + secondsprefix+ seconds)
  
  }


  render() {
 
    return (
      <Panel className="statsPanel">
        <Panel.Heading><Panel.Title componentClass="h2">Stats</Panel.Title></Panel.Heading>
        <Panel.Body>
        <ListGroup>
          <img alt="" className="statsLogo" src={chainRing}/>&nbsp;&nbsp;<span className="listGroupTitle">Year-To-Date</span>
          <ListGroupItem><img alt="Series Logo" className="logoimage" src={icupLogo}/>&nbsp;ICUP Races: {this.props.ytdStats.ICUP}</ListGroupItem>
          <ListGroupItem><img alt="Series Logo" className="logoimage" src={mwLogo}/>&nbsp;Mid-Week Races: {this.props.ytdStats.Midweek}</ListGroupItem>
          <ListGroupItem><img alt="Series Logo" className="logoimage" src={USACLogo}/>&nbsp;USAC Races: {this.props.ytdStats.USAC}</ListGroupItem>
          <ListGroupItem><img alt="Series Logo" className="logoimage" src={chainRing}/>&nbsp;Other Races: {this.props.ytdStats.Other}</ListGroupItem>
          <ListGroupItem>Races: {this.props.ytdRaces.length}</ListGroupItem>
          <ListGroupItem>Podiums: {this.props.ytdStats.podiums}</ListGroupItem>
          <ListGroupItem>Wins: {this.props.ytdStats.wins}</ListGroupItem>
          <ListGroupItem>Time: {this.getTimeString(this.props.ytdRaces)}</ListGroupItem>
        </ListGroup>

        </Panel.Body>
      </Panel>
     
    )
  }

}

export default YearToDate
