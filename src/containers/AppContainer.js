// AppContainer.js
import React, {Component} from 'react';
import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';
import '.././css/AppContainer.css';
import Login from '.././components/Login';
import Home from '.././components/Home';
import Register from '.././components/Register';
import Plp from '.././components/Plp';
import Menu from '.././components/Menu';
import logo from '../images/logo2.png';
import accountLogo from '../images/account.png';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Col, Row } from 'reactstrap';
import axios from 'axios';
import Chat from '.././components/Chat';

global.config = require('../config');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      accountDropDownOpen: false,
      isAuthenticated: false,
      Authenticated: false
    };
    this.childHandler = this.childHandler.bind(this);
  }

  childHandler = (data) => {
    this.setState({categories:[], childData:data});
    //alert();
    //this.props.activateGeod({"ttt":"qrty"});
    console.log("======>"+data);
  }

  toggleAccountDropDown = () => {
    this.setState({accountDropDownOpen : !this.state.accountDropDownOpen});
  }

  logout = () =>{
    axios.get(global.config.apiUrl+"/logout").then((res, error) => {
      console.log("logout...");
      document.cookie = 'Authorization=; Path=/; Expires='+new Date();      
      window.location.assign("/login");
    });
  }

  componentWillMount() {
    var cookies = document.cookie, token=null;
    if(cookies){
      cookies = cookies.split(';');
      for(var i=0; i<=cookies.length-1; i++){
        if(cookies[i].indexOf("Authorization") > -1){
          token = (cookies[i].split("Authorization="))[1];
          break; 
        }
      }
      axios.defaults.headers.common = {
        "Authorization": token
      };
      //axios.defaults.headers.common['Authorization'] = token;
    }
    axios.get(global.config.apiUrl+"/verifyToken").then(res => {
      if(res.data && !res.data.error){
        this.setState({isAuthenticated: true});
        global.config.name = res.data.user;
      }
      this.setState({Authenticated: true});
    }).catch(err => {
      this.setState({Authenticated: true});
    });
  }

  render() {
    const currentPath = window.location.pathname.toLowerCase();  
    //const Json = this.props.geod.categories;
    return this.state.Authenticated && (
      <div>
         {/*{this.state.childData ? this.state.childData : "no child data"}*/}
         {/*currentPath === '/login' || currentPath === '/' ? null : <Menu Categories={Json} callBackToParent={this.childHandler} />*/}
         {currentPath === '/login' || currentPath === '/' ? null : <Menu callBackToParent={this.childHandler} />}
         <div id="main">
           <header>
              <Container style={{"maxHeight": "100%", "maxWidth": "100%"}}>
                <Row>
                  <Col className="col-4"></Col>
                  <Col className="col-4">
                    <Link to="/home">
                      <img id="imgLogo" alt="Logo" src={logo} />
                    </Link>
                  </Col>
                  <Col className="col-4 accountCol">
                  {
                    currentPath === '/login' || currentPath === '/' ? null : 
                    <div className="accountLogoDiv">
                      <Dropdown isOpen={this.state.accountDropDownOpen} toggle={this.toggleAccountDropDown}>
                        <DropdownToggle color="link" >
                          <img className="accountLogo" alt="Logo" src={accountLogo} />
                        </DropdownToggle>
                        <DropdownMenu id="accountMenu">
                          <DropdownItem onClick={this.logout}>Logout</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  }
                  </Col>
                </Row>
              </Container>
           </header>
           <div id="routeContent">
              <Switch>
                  <Route exact path="/" render={() => (this.state.isAuthenticated ? <Redirect to="/home"/> : <Redirect to="/login"/>) } />
                  <Route exact path='/login' component={Login} key={this.props.location.pathname} />
                  <Route exact path='/home' component={Home} key={this.props.location.pathname} />
                  <Route exact path='/signup' component={Register} key={this.props.location.pathname} />
                  <Route component={Plp} path='/plp/:catId' key={this.props.location.pathname} />
              </Switch>
              <div>
                {currentPath === '/login' || currentPath === '/' ? null : <Chat />}
              </div>
           </div>
         </div>
       </div>
    );
  }
}

const AppContainer = withRouter(App);

export default AppContainer;  