import React, {Component} from 'react'
import {Modal,Form, Panel, Button,FormGroup, ControlLabel, FormControl} from "react-bootstrap"
import {create} from './api-race.js'
import auth from '../auth/auth-helper.js'


class NewRace extends Component {
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

    this.setState({user: auth.isAuthenticated().user})
  }

clickAddRace = () => {
  const race = {

    race_name: this.state.race_name || undefined,
    series: this.state.series || undefined,
    race_date: this.state.race_date || undefined,
    location: this.state.location || undefined,
    time: this.state.time || undefined,
    rank: this.state.rank || undefined,
    category: this.state.category || undefined
    
  }

    const jwt = auth.isAuthenticated()
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, race).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
        console.log(data.error)
      } else {
        this.setState({series: '',race_name: '',race_date: '',location:'',category:'',time:'',rank:'',show:true})

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
    this.setState({ show: false });
    this.props.reloadRaces(this.props.userId)
  }  

  render() {

    return (<div className="NewRace modal-container">
      <Panel id="addRace">
      <Panel.Heading><Panel.Title toggle>Add Race</Panel.Title></Panel.Heading>
      <Panel.Collapse>
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
        <Button color="primary" disabled={!this.validateForm()} onClick={this.clickAddRace} className="">Add Race</Button>
        </Panel.Footer>
      </Panel.Collapse>
      </Panel>

      <Modal show={this.state.show} onHide={this.handleClose} container={this} >
        <Modal.Header closeButton>
         <Modal.Title>Add Race</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>New race successfully created.</h4>
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

export default NewRace
