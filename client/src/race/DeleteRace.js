import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {remove} from './api-race.js'
import DeleteRaceModal from './DeleteRaceModal'

class DeleteRace extends Component {

  state = {
    open: false
  }

  clickButton = () => {
    this.setState({open: true})
  }
  deleteRace = () => {

    const jwt = auth.isAuthenticated()
    remove({
      raceId: this.props.raceId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({open: false})
        this.props.reloadRaces(this.props.userId)
//        this.props.closeRacePanel()
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
  
    if (this.state.open){
      return <DeleteRaceModal container={this.props.container} handleRequestClose={this.handleRequestClose} handleDelete={this.deleteRace}/>
    }
    else return (
     
      <Button bsStyle="link" className="pull-right" bsSize="small" onClick={this.clickButton}><span className="glyphicon glyphicon-trash" aria-label="Delete" aria-hidden="true" > </span></Button>
      
    )

  }
}

export default DeleteRace
