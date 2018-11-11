import React, {Component} from 'react'
import {Glyphicon, Panel, Button,FormGroup} from "react-bootstrap"
import {create} from './api-banner.js'
import auth from '../auth/auth-helper.js'
import "./Banner.css"

class NewBanner extends Component {
  state = {
    photo: '',
    error: '',
    user: {}
  }

  componentDidMount = () => {
    this.bannerData = new FormData()
    this.setState({user: auth.isAuthenticated().user})
  }
  clickUploadBanner = () => {
    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, this.bannerData).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({photo: ''})
        this.props.reloadBanners(data.postedBy._id)
      }
    })
  }
  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    this.bannerData.set(name, value)
    this.setState({ [name]: value })
  }
  render() {

    return (<div className="NewBanner">
      <Panel>
      <Panel.Heading>
    <Panel.Title>Upload New Banner</Panel.Title>
            
      </Panel.Heading>    
      <Panel.Body>
        <FormGroup>
        <input accept="image/*" onChange={this.handleChange('photo')} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
        <span><Button componentClass="span"><Glyphicon glyph="camera" /></Button></span>
        </label><span className="NewBannerFileName" >{this.state.photo ? this.state.photo.name : ''}</span>

        </FormGroup>
        <FormGroup>
        { this.state.error && (<span>
            <Glyphicon glyph="warning-sign"></Glyphicon>{this.state.error}</span>)
        }
        </FormGroup>
      </Panel.Body>
      <Panel.Footer>
        <Button color="primary" disabled={this.state.photo===''} onClick={this.clickUploadBanner} className="">Upload</Button>
        </Panel.Footer>
    </Panel>
  </div>)
  }
}

export default NewBanner
