import React, {Component} from 'react'
import {Tooltip, OverlayTrigger, Glyphicon} from "react-bootstrap"
//import icupLogo from './../assets/logos/icup.jpg'
//import mwLogo from './../assets/logos/midweek.jpg'
//import USACLogo from './../assets/logos/USAC.png'
//import USCSLogo from './../assets/logos/uscs.jpg'
//import chainRing from './../assets/logos/chainring.jpg'
//import stravaLogo from './../assets/logos/stravaicon.jpg'
import EditRace from './EditRace'
import "./Race.css"

class RaceRow extends Component {
state={

    open: false,
    class:"editRacePanel"
  }


clickEdit =(e) =>{
  e.preventDefault()
this.setState({open:!this.state.open})

this.props.updateOpenRace(this.props.race)

}

  render() {

    const tooltip = (
      <Tooltip id="tooltip">
        <strong>View Strava Data for this Race (must allow popups)</strong>
      </Tooltip>
    );

    const editTooltip = (
      <Tooltip id="tooltip">
        <strong>Edit or Delete this Race</strong>
      </Tooltip>
    );

const stravaLink = (new Date(this.props.race.race_date)>new Date("2010-06-09")&&!this.props.edit) ? (
  <a href={"#"+this.props.race.race_date} onClick={this.props.strava} >
  <OverlayTrigger placement="left" overlay={tooltip}>
  <img alt="Edit Race Link" className="logoimage pull-right" src='/logos/stravaicon.jpg' data-race-name={this.props.race.race_name} data-race-date={this.props.race.race_date}/>
  </OverlayTrigger>
  </a>
):(null)

const editLink = this.props.edit ? (
/*eslint-disable-next-line*/
  <a href={"#"}>
  <OverlayTrigger placement="left" overlay={editTooltip}>
  <Glyphicon onClick={this.clickEdit} glyph="pencil" className="pull-right"></Glyphicon>
  </OverlayTrigger>
  </a>
):(null)

//const editPanel = this.state.class==="expandRacePanel" ?
const editPanel = (this.props.open&&this.state.open) ? (
  <tr id="open" className= "Trans">
  <td colSpan="6">
<EditRace race={this.props.race} reloadRaces={this.props.reloadRaces} closeRacePanel={this.clickEdit}/>
  </td>
  </tr>
 ): <tr id="closed" className="Trans"></tr>



    let logo ='';
    switch (this.props.race.series){
      case "Intermountain Cup": logo='/logos/icup.jpg'
      break
      case "Mid-Week": logo='/logos/midweek.jpg'
      break
      case "USAC": logo='/logos/USAC.png'
      break
      case "Utah State Championship Series": logo='/logos/uscs.jpg'
      break
      default:logo='/logos/chainring.jpg'
      break

    }
    return (
<tbody id={this.props.race._id}>
      <tr>

      <td><img alt="Series Logo" className="logoimage" src={logo}/>{this.props.race.series}</td>
      <td>{this.props.race.race_name}
    
      {stravaLink}{editLink}

      </td>
      <td className ="centerthis">{this.props.race.race_date.substring(0,10)}</td>
      <td className ="centerthis">{this.props.race.category}</td>

      <td className ="centerthis">{this.props.race.time}</td>
      <td className ="centerthis">{this.props.race.rank}</td>
      
    </tr>


{editPanel}


  
</tbody>
      
    )
  }


}

export default RaceRow
