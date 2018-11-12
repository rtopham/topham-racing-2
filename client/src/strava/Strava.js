import React, {Component} from 'react'
import {getStravaByUser} from './../strava/api-strava.js'
import {getStravaToken} from './../user/api-user.js'
import StravaStatsPanel from './StravaStatsPanel.js'
import BannerLink from './../bannerlink/BannerLink'

function StravaWidgets(){
  return(
  
  <div> 
  
  <iframe title="latestRides" height='454' width='930' frameBorder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/athletes/292385/latest-rides/beab763db7c16d93be7e3428be95f35258a2ce41'></iframe>
  <iframe title="latestActivity" height='160' width='930' frameBorder='0' allowtransparency='true' scrolling='no' src='https://www.strava.com/athletes/292385/activity-summary/beab763db7c16d93be7e3428be95f35258a2ce41'></iframe>
  </div>
  )
  }


class Strava extends Component {
  constructor({match}) {
    super()
    this.state = {
      userStravaToken: '',
      redirectToSignin: false,
      races: [],
stravaStats: {
      ytdStats:{
        totalRides:0,
        totalDistance:0,
        totalTime:"",
        totalMovingTime:"",
        totalElevation:0,
        
     },

     recentStats:{
         totalRides:0,
         totalDistance:0,
         totalTime:"",
         totalMovingTime:"",
         totalElevation:0,
         
      },

     allTimeStats:{
         totalRides:0,
         totalDistance:0,
         totalTime:"",
         totalMovingTime:"",
         totalElevation:0,
      }
    },
    }
    this.match = match
  }
 
componentDidMount = () => {

this.init(this.match.params.userId)

  }

init = (userId) =>{

  getStravaToken({
    userId: userId
  }).then((data) => {
    if (data.error) {
    console.log("No Strava Token Found")
    } else {

      this.loadStravaData(data.id,data.token)

    }
  })

}


getTimeString(seconds){
  let hours = (seconds/3600);
  return hours.toLocaleString('en', {maximumFractionDigits:1})
  
  }
  
  getMilesString(meters){
  
      let miles = (meters/ 1609.34);
      return miles.toLocaleString('en', {maximumFractionDigits:1})
      
  
  }
  
  getElevationString(meters){
      
          let feet = (meters * 3.28084);
          return feet.toLocaleString('en', {maximumFractionDigits:0})
          
      
      }

loadStravaData = (stravaId, stravaToken) => {
getStravaByUser({
      stravaId: stravaId,
      stravaToken: stravaToken
    },).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {

        let stravaStats=Object.assign({}, this.state.stravaStats);
        stravaStats.recentStats.totalRides=data.recent_ride_totals.count.toLocaleString('en', {maximumFractionDigits:0});
        stravaStats.recentStats.totalDistance=this.getMilesString(data.recent_ride_totals.distance);
        stravaStats.recentStats.totalTime=this.getTimeString(data.recent_ride_totals.elapsed_time);
        stravaStats.recentStats.totalMovingTime=this.getTimeString(data.recent_ride_totals.moving_time);
        stravaStats.recentStats.totalElevation=this.getElevationString(data.recent_ride_totals.elevation_gain);
        stravaStats.ytdStats.totalRides=data.ytd_ride_totals.count.toLocaleString('en', {maximumFractionDigits:0});
        stravaStats.ytdStats.totalDistance=this.getMilesString(data.ytd_ride_totals.distance);
        stravaStats.ytdStats.totalTime=this.getTimeString(data.ytd_ride_totals.elapsed_time);
        stravaStats.ytdStats.totalMovingTime=this.getTimeString(data.ytd_ride_totals.moving_time);
        stravaStats.ytdStats.totalElevation=this.getElevationString(data.ytd_ride_totals.elevation_gain);
        stravaStats.allTimeStats.totalRides=data.all_ride_totals.count.toLocaleString('en', {maximumFractionDigits:0});
        stravaStats.allTimeStats.totalDistance=this.getMilesString(data.all_ride_totals.distance);
        stravaStats.allTimeStats.totalTime=this.getTimeString(data.all_ride_totals.elapsed_time);
        stravaStats.allTimeStats.totalMovingTime=this.getTimeString(data.all_ride_totals.moving_time);
        stravaStats.allTimeStats.totalElevation=this.getElevationString(data.all_ride_totals.elevation_gain);
        this.setState({stravaStats: stravaStats});
  
        
      }
    })
  }

  

  render() {
    
    if(!this.state.stravaStats)return null; else

    return (
      <div className="globalCore">
      <BannerLink userId={this.match.params.userId}/>
      <StravaStatsPanel title="Recent Stats (last 28 days)" stats={this.state.stravaStats.recentStats}/>
      <StravaStatsPanel title="Year-to-Date Stats" stats={this.state.stravaStats.ytdStats}/>
      <StravaStatsPanel title="All Time Stats (since 2012)" stats={this.state.stravaStats.allTimeStats}/>
      <StravaWidgets/>
      </div>
      
        
    )
  }
}


export default Strava
