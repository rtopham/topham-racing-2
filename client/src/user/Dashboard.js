import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem} from "react-bootstrap"
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect} from 'react-router-dom'
import RaceList from './../race/RaceList'
import NewRace from './../race/NewRace'
import EditProfile from './../user/EditProfile'
import {listByUser} from './../race/api-race.js'
import {listBannersByUser} from '../banner/api-banner'
import NewBanner from './../banner/NewBanner'
import BannerList from './../banner/BannerList'
import "./Users.css"

class Profile extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: {},
      redirectToSignin: false,
      races: [],
      banners:[]
    }
    this.match = match
  }
  init = (userId) => {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({redirectToSignin: true})
      } else {
        this.setState({user: data})
        this.loadRaces(data._id)
        this.loadBanners(data._id)
        
      }
    })
  }
  componentWillReceiveProps = (props) => {
    this.init(props.match.params.userId)
  }
  componentDidMount = () => {
    this.init(this.match.params.userId)
  }

  loadRaces = (user) => {
    const jwt = auth.isAuthenticated()
    listByUser({
      userId: user
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({races: data})
      }
    })
  }
  //is this even called? or did we put removeRace somewhere else? Actually, I think we just reload the whole list after delete so this is not needed.
  removeRace = (race) => {
    const updatedRaces = this.state.races
    const index = updatedRaces.indexOf(race)
    updatedRaces.splice(index, 1)
    this.setState({races: updatedRaces})
  }

  loadBanners = (user) =>{
    const jwt = auth.isAuthenticated()
    listBannersByUser({
      userId: user
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({banners: data})
       }
    })
  }



  render() {

    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <div className="Profile">
       <div>
        <ListGroup>
          <ListGroupItem header={this.state.user.name}>{this.state.user.email}</ListGroupItem>
            <ListGroupItem>{"Joined: " + (new Date(this.state.user.created)).toDateString()}</ListGroupItem>
        </ListGroup>
      </div>
      <EditProfile match={this.match}/>
<NewRace userId={this.state.user._id} reloadRaces={this.loadRaces}/>
      <Panel id="editRaces">
      <Panel.Heading><Panel.Title toggle>Edit Races</Panel.Title></Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
      <RaceList races={this.state.races} edit={true} reloadRaces={this.loadRaces}/>
      </Panel.Body>
      </Panel.Collapse>
      </Panel>
      <Panel>
        <Panel.Heading>
          <Panel.Title toggle>Banners</Panel.Title>
          <Panel.Collapse>
            <Panel.Body>
              <NewBanner reloadBanners={this.loadBanners}/>
              <BannerList banners={this.state.banners} reloadBanners={this.loadBanners}/>
            </Panel.Body>
          </Panel.Collapse>
        </Panel.Heading>
      </Panel>
      </div>
    )
  }
}


export default Profile
