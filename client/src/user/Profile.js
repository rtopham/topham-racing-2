import React, {Component} from 'react'
import {Panel, ListGroup, Button, ListGroupItem} from "react-bootstrap"
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import RaceList from './../race/RaceList'
import {listByUser} from './../race/api-race.js'
import "./Users.css"

class Profile extends Component {
  constructor({match}) {
    super()
    this.state = {
      user: '',
      redirectToSignin: false,
      races: []
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
  removeRace = (race) => {
    const updatedRaces = this.state.races
    const index = updatedRaces.indexOf(race)
    updatedRaces.splice(index, 1)
    this.setState({races: updatedRaces})
  }



  render() {

    const redirectToSignin = this.state.redirectToSignin
    if (redirectToSignin) {
      return <Redirect to='/signin'/>
    }
    return (
      <div className="Profile">
      <Panel>
        <Panel.Heading>User Profile</Panel.Heading>
        <Panel.Body>
        <div>
        <ListGroup>
          <ListGroupItem header={this.state.user.name}>{this.state.user.email}</ListGroupItem>
            <ListGroupItem>{"Joined: " + (new Date(this.state.user.created)).toDateString()}</ListGroupItem>
        </ListGroup>
      </div>
      <div>
        <span className="pull-right">
          {auth.isAuthenticated().user && auth.isAuthenticated().user._id === this.state.user._id &&(<span className="pull-right">
          <LinkContainer to={"/user/edit/" + this.state.user._id}>
          <Button bsStyle="link" bsSize="xsmall"><span className="glyphicon glyphicon-pencil Profile-glyph" aria-hidden="true"> </span></Button>
          </LinkContainer>
          <DeleteUser userId={this.state.user._id}/> </span> )
          }</span>
        </div>
        </Panel.Body>
      </Panel>
      <RaceList races={this.state.races}/>
      </div>
    )
  }
}


export default Profile
