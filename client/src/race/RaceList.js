import React, {Component} from 'react'
import {Panel, Table} from "react-bootstrap"
import {Link} from 'react-router-dom'
import RaceRow from './RaceRow'
import {getStravaRaceData} from './../strava/api-strava.js'
import {getStravaToken} from './../user/api-user.js'
import "./Race.css"

class RaceList extends Component {
  state={

    openRace:''
  }

clickStrava = (e) =>{
    e.preventDefault();
    let raceDate=e.target.dataset.raceDate
    console.log(e.target.dataset.raceDate)
    getStravaToken({
      userId: this.props.userId
    }).then((data) => {
      if (data.error) {
      console.log("No Strava Token Found")
      } else {

        this.loadStravaRaceData(data.id,data.token,raceDate)

      }
    })

}

updateOpenRace = (race) =>{

  this.setState({openRace:race})
}

loadStravaRaceData=(stravaId, stravaToken, raceDate) =>{
  getStravaRaceData({
    stravaId: stravaId,
    stravaToken: stravaToken,
    raceDate: raceDate
  },).then((data) => {
    if (data.error) {
      console.log(data.error)
    } else {

    let raceID=0;
    let sufferScore=0;
    let loopCount=data.length;
    if (data.length>3) loopCount=3;
    
          for(var i=0; i<loopCount; i++){
            if(data[i].suffer_score>sufferScore){
              sufferScore=data[i].suffer_score;
              raceID=data[i].id;
            }
     
          }  

          window.open(`https://www.strava.com/activities/${raceID}`);  
    }
  })
}

  render() {
    const currentYear=(new Date()).getFullYear();

    return (
<Panel className="editRace">
  <Panel.Heading><Panel.Title>Race History
  {!this.props.edit&&(
  <span className="pull-right">
  <Link className="linkSpace" to={`/races/${this.props.userId}`}>All</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?race_date=${currentYear}`}>Current Season</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?race_date=${currentYear-1}`}>Last Season</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?series=Intermountain Cup`}>ICUP</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?series=Mid-Week`}>Mid-Week</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?series=USAC`}>USAC</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?series_ne=Intermountain Cup&series_ne=Mid-Week&series_ne=USAC`}>Other</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?rank_gte=1&rank_lte=3`}>Podiums</Link>
  <Link className="linkSpace" to={`/races/${this.props.userId}?rank=1`}>Wins</Link>
</span>)}
  </Panel.Title></Panel.Heading>
      <Table striped bordered condensed hover>
      <thead>
    <tr>
      <th>Series</th>
      <th>Name</th>
      <th className ="centerthis">Date</th>
      <th className ="centerthis">Category</th>
      <th className ="centerthis">Time</th>
      <th className ="centerthis">Rank</th>
    </tr>
  </thead>  
 
      
        {this.props.races.map((item, i) => {
          const open = item===this.state.openRace? true:false
            return<RaceRow open={open} race={item} key={i} updateOpenRace={this.updateOpenRace} reloadRaces={this.props.reloadRaces} edit={this.props.edit} onRemove={this.props.removeUpdate} strava={this.clickStrava}/>
                             
          })

        }

 
      </Table>
      </Panel>
      
    )
  }
}

export default RaceList
