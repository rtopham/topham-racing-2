import React, {Component} from 'react'
import {Modal,Form, Panel, Button,FormGroup, ControlLabel, FormControl} from "react-bootstrap"
import DeleteUser from './DeleteUser'
import {read, update} from './api-user.js'
import auth from '../auth/auth-helper.js'
import "./Users.css"

class EditProfile extends Component {
  constructor({match}) {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      strava_athlete_id: '',
      strava_token: '',
      redirectToProfile: false,
      show:false,
      expand:false,
      error: ''
    }
    this.match = match
  }

componentDidMount = () => {
    const jwt = auth.isAuthenticated()
    read({
      userId: this.match.params.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({name: data.name, email: data.email, strava_athlete_id:data.strava_athlete_id || '',strava_token:data.strava_token||''})
      }
    })
  }

clickUpdateProfile = () => {
    const jwt = auth.isAuthenticated()
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      strava_athlete_id: this.state.strava_athlete_id,
      strava_token: this.state.strava_token
    }
    update({
      userId: this.match.params.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({password:'',confirmPassword:'',show: true})
 
      }
    })
  }

 validateInputLength(input, min){
  const length = input.length
    if(length>min) return 'success';
    else if (length>0) return 'error';
    return null;
 }

 validateDate(date){
  const regex = /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/ 
  if(regex.test(date)) return 'success'; else if (date.length>0) return 'error'
 }

 validateTime(time){
  const regex = /^([0-9][0-9]):([0-5][0-9]):([0-5][0-9])$/
  if(regex.test(time)) return 'success'; else if (time.length>0) return 'error'
 }
 
 validateStravaId(id){
  const regex = /^[0-9]{1,20}$/
  if(regex.test(id)) return 'success'; else if (id.length>0) return 'error'
 }

 validateEmail(email){
  const regex =  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g 
  if(regex.test(email)) return 'success'; else if (email.length>0) return 'error'
 } 

 //Note: the password regex requires at least 8 characters, at least 1 uppercase letter, at least one lower case number and at least one number. Special characters are allowed
 validatePassword(password){
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm 
  if(regex.test(password)) return 'success'; else if (password.length>0) return 'error'
 } 

 validateConfirmPassword(confirmPassword){
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm
  if(regex.test(confirmPassword)&&confirmPassword===this.state.password) return 'success'; else if (confirmPassword.length>0) return 'error'
 }  


  validateForm() {
    return (
      this.validateInputLength(this.state.name,2)==='success'&&
      this.validateEmail(this.state.email)==='success'&&
      this.validateInputLength(this.state.strava_token,20)==='success'&&
      this.validateStravaId(this.state.strava_athlete_id)==='success'&&
      this.validatePassword(this.state.password)==='success'&&
      this.validateConfirmPassword(this.state.confirmPassword)==='success'

    );
  }  

  handleChange = name => event => {
    const value = event.target.value
//    this.raceData.set(name, value)
    this.setState({ [name]: value })
  }

  handleClose = () => {
    this.setState({ show: false, expand:false });

  }  

  toggleExpand =() =>{
    this.setState({expand:!this.state.expand})
  }

  render() {

    return (<div className="modal-container">
      <Panel id="editProfile" onToggle={this.toggleExpand} expanded={this.state.expand}>
      <Panel.Heading><Panel.Title>
        <Panel.Toggle href="#" componentClass="a">
        Edit Profile
        </Panel.Toggle>
        </Panel.Title></Panel.Heading>
      <Panel.Collapse>
        <Panel.Body>
        <Form>
                <FormGroup validationState={this.validateInputLength(this.state.name,2)}>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl
                  value={this.state.name}
                  onChange={this.handleChange("name")}
                  name="name" autoFocus />
                </FormGroup>
                <FormGroup validationState={this.validateEmail(this.state.email)}>
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange("email")}                  
                  name="email" />
                </FormGroup>
                <FormGroup validationState={this.validateStravaId(this.state.strava_athlete_id)}>
                  <ControlLabel>Strava Athlete Id</ControlLabel>
                  <FormControl
                  value={this.state.strava_athlete_id}
                  onChange={this.handleChange("strava_athlete_id")}                  
                  name="strava_athlete_id" />
                </FormGroup>
                <FormGroup validationState={this.validateInputLength(this.state.strava_token,20)}>
                  <ControlLabel>Strava Token</ControlLabel>
                  <FormControl
                  value={this.state.strava_token}
                  onChange={this.handleChange("strava-token")}                  
                  name="strava_token" />
                </FormGroup>
                <FormGroup validationState={this.validatePassword(this.state.password)} >
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange("password")}                  
                  name="password" />
                </FormGroup>
                <FormGroup validationState={this.validateConfirmPassword(this.state.confirmPassword)} >
                  <ControlLabel>Confirm Password</ControlLabel>
                  <FormControl
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange("confirmPassword")}                  
                  name="confirmPassword" />
                </FormGroup>
    
              </Form>
      </Panel.Body>
      <Panel.Footer>
        <Button color="primary" disabled={!this.validateForm()} onClick={this.clickUpdateProfile} className="">Update Profile</Button>
        <DeleteUser container={this} userId={this.match.params.userId}/>
        </Panel.Footer>
      </Panel.Collapse>
      </Panel>

      <Modal container={this} show={this.state.show} onHide={this.handleClose} >
        <Modal.Header closeButton>
         <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Profile successfully updated.</h4>
        </Modal.Body>
        <Modal.Footer>

            <Button bsStyle="primary" onClick={this.handleClose}>
              Ok
            </Button>

        </Modal.Footer>
      </Modal>

  </div>)
  }
}

export default EditProfile
