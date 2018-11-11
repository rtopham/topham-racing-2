import React, {Component} from 'react'
import {Button, Tooltip, OverlayTrigger} from 'react-bootstrap'
import auth from './../auth/auth-helper'
import {remove} from './api-banner.js'
import DeleteBannerModal from './DeleteBannerModal'

class DeleteBanner extends Component {

  state = {
     open: false
  }

  clickButton = () => {
    this.setState({open: true})
  }
  deleteBanner = () => {

    const jwt = auth.isAuthenticated()
    remove({
      bannerId: this.props.bannerId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        this.setState({open: false})
        this.props.reloadBanners(this.props.userId)
      }
    })
  }
  handleRequestClose = () => {
    this.setState({open: false})
  }
  render() {
  
    const deleteBannertip = (
      <Tooltip id="tooltip">
        <strong>Delete this Banner</strong>
      </Tooltip>
    );

    
    if (this.state.open){
      return <DeleteBannerModal container={this.props.container} handleRequestClose={this.handleRequestClose} handleDelete={this.deleteBanner}/>
    }
    else return (
     <OverlayTrigger placement="left" overlay={deleteBannertip}>
      <Button className="pull-right" bsSize="small" onClick={this.clickButton}><span className="glyphicon glyphicon-trash" aria-label="Delete" aria-hidden="true" > </span></Button>
      </OverlayTrigger>
    )

  }
}

export default DeleteBanner
