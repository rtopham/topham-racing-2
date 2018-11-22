import React, {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Home from './core/Home'
//import Users from './user/Users'
//import Signup from './user/Signup'
import Signin from './auth/Signin'
import Stats from './stats/Stats'
import Strava from './strava/Strava'
import Profile from './user/Profile'
import Dashboard from  './user/Dashboard'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'

const divStyle={
  marginTop: "150px", 
  height: "150px",
  width: "100%",
  textAlign: "center"
}
const NoMatch = () => <div style={divStyle}><h2>Page Not Found</h2></div>

class MainRouter extends Component {

  /*
  // Removes the server-side injected CSS when React component mounts
  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }
*/

  render() {
    return (<div>
     <Menu/>
      <Switch>
      <Redirect exact from="/" to="/races/5bd91a027b59b61efe06ae3d" />
{/*<Route exact path="/" component ={Home}/>*/}
      <Redirect exact from="/stats" to="/stats/5bd91a027b59b61efe06ae3d" />
      <Redirect exact from="/strava" to="/strava/5bd91a027b59b61efe06ae3d" />
{/*        <Route path="/users" component={Users}/>*/}
{/*        <Route path="/signup" component={Signup}/>*/}
        <Route path="/signin" component={Signin}/>
        <Route path="/races/:userId" component={Home}/>
        <Route path="/stats/:userId" component={Stats}/>
        <Route path="/strava/:userId" component={Strava}/>
{/*        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>*/}
        <PrivateRoute path="/user/dashboard/:userId" component={Dashboard} />
        <Route path="/user/:userId" component={Profile}/>
        <Route path="*" component={NoMatch} />
 

      </Switch>
      <hr></hr>
      <div className="centerthis">Race a bike. Improve your life.</div>
      <hr></hr>
    </div>)
  }
}

export default MainRouter
