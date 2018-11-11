import React, {Component} from 'react'
import {Modal,Form, Panel, Button,FormGroup, ControlLabel, FormControl} from "react-bootstrap"
import {update} from './api-race.js'
import auth from '../auth/auth-helper.js'
import {read} from './../user/api-user.js'
import DeleteRace from './DeleteRace'
import "./Race.css"


class EditRace extends Component {
state = {
    series: '',
    race_name: '',
    race_date: '',
    location: '',
    category: '',
    time: '',
    rank: '',
    show: false,
    error:''
  }


componentDidMount = () => {
  const jwt = auth.isAuthenticated()
  read({
    userId: this.props.race.postedBy._id
  }, {t: jwt.token}).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
    } else {

this.setState({series: this.props.race.series, race_name: this.props.race.race_name, race_date:this.props.race.race_date.substring(0,10),location:this.props.race.location||'',category:this.props.race.category, time:this.props.race.time,rank:this.props.race.rank,show:false})

    }
  })
}

clickUpdateRace = () => {
  const jwt = auth.isAuthenticated()
  const race = {

    race_name: this.state.race_name,
    series: this.state.series,
    race_date: this.state.race_date,
    location: this.state.location,
    time: this.state.time,
    rank: this.state.rank,
    category: this.state.category
    
  }
  update({
    raceId: this.props.race._id
  }, {
    t: jwt.token
  }, race).then((data) => {
    if (data.error) {
      this.setState({error: data.error})
      console.log(data.error)
    } else {

this.setState({show:true})

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
 
 validateRank(rank){
  const regex = /^[0-9]{1,4}$/
  if(regex.test(rank)) return 'success'; else if (rank.length>0) return 'error'
 }


  validateForm() {
    return (
      this.validateInputLength(this.state.series,2)==='success'&&
      this.validateInputLength(this.state.race_name,4)==='success'&&
      this.validateDate(this.state.race_date)==='success'&&
      this.validateInputLength(this.state.location,4)==='success'&&
      this.validateInputLength(this.state.category,3)==='success'&&
      this.validateTime(this.state.time)==='success'&&
      this.validateRank(this.state.rank)==='success'

    );
  }  

  handleChange = name => event => {
    const value = event.target.value
    this.setState({ [name]: value })
  }

  handleClose = () => {
      this.setState({show: false });
    this.props.reloadRaces(this.props.race.postedBy._id)
    this.props.closeRacePanel()
  }  

  render() {

//    console.log(this.props.race._id)

    return (<div className="modal-container">
      <Panel id="addRace">
 
        <Panel.Body>
        <Form>
                <FormGroup validationState={this.validateInputLength(this.state.series,2)}>
                  <ControlLabel>Series</ControlLabel>
                  <FormControl
                  value={this.state.series}
                  onChange={this.handleChange("series")}
                  name="series" autoFocus />
                </FormGroup>
                <FormGroup validationState={this.validateInputLength(this.state.race_name,4)}>
                  <ControlLabel>Race Name</ControlLabel>
                  <FormControl
                  value={this.state.race_name}
                  onChange={this.handleChange("race_name")}                  
                  name="race_name" />
                </FormGroup>
                <FormGroup validationState={this.validateDate(this.state.race_date)} >
                  <ControlLabel>Date</ControlLabel>
                  <FormControl
                  placeholder="YYYY-MM-DD"
                  value={this.state.race_date}
                  onChange={this.handleChange("race_date")}                  
                  name="race_date" />
                </FormGroup>
                <FormGroup validationState={this.validateInputLength(this.state.location,4)}>
                  <ControlLabel>Location</ControlLabel>
                  <FormControl
                  value={this.state.location}
                  onChange={this.handleChange("location")}                  
                  name="location" />
                </FormGroup>
                <FormGroup validationState={this.validateInputLength(this.state.category,3)}>
                  <ControlLabel>Category</ControlLabel>
                  <FormControl
                  value={this.state.category}
                  onChange={this.handleChange("category")}                  
                  name="category" />
                </FormGroup>
                <FormGroup validationState={this.validateTime(this.state.time)}>
                  <ControlLabel>Time</ControlLabel>
                  <FormControl
                  placeholder="HH:MM:SS"
                  value={this.state.time}
                  onChange={this.handleChange("time")}                  
                  name="time" />
                </FormGroup>              
                <FormGroup validationState={this.validateRank(this.state.rank)}>
                  <ControlLabel>Rank</ControlLabel>
                  <FormControl
                  value={this.state.rank}
                  onChange={this.handleChange("rank")}                  
                  name="rank" />
                </FormGroup>
    
              </Form>
      </Panel.Body>
      <Panel.Footer>
        <Button color="primary" disabled={!this.validateForm()} onClick={this.clickUpdateRace} className="">Save Changes</Button>
        <DeleteRace container={this} userId={this.props.race.postedBy._id} raceId={this.props.race._id} closeRacePanel={this.props.closeRacePanel} reloadRaces={this.props.reloadRaces}/>

        </Panel.Footer>

      </Panel>

      <Modal show={this.state.show} onHide={this.handleClose} container={this} >
        <Modal.Header closeButton>
         <Modal.Title>Add Race</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Race successfully updated.</h4>
        </Modal.Body>
        <Modal.Footer>

            <Button bsStyle = "primary" onClick={this.handleClose}>
              Ok
            </Button>

        </Modal.Footer>
      </Modal>

  </div>)
  }
}

export default EditRace
