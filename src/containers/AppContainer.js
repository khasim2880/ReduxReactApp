// AppContainer.js
import React, {Component} from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
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
global.config = require('../config');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      accountDropDownOpen: false
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
      window.location.assign("/login");
    });
  }

  componentDidMount() {
    /*axios.get('http://localhost:1330/categories')
      .then(res => {
        const categories = res.data;
        this.setState({ categories });
        this.props.activateGeod({categories});
      });*/
  }

  render() {
    const currentPath = window.location.pathname.toLowerCase();
    //const Json = this.props.geod.categories;
    return (
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
                  <Route exact path='/' component={Login} key={this.props.location.pathname} />
                  <Route exact path='/login' component={Login} key={this.props.location.pathname} />
                  <Route exact path='/home' component={Home} key={this.props.location.pathname} />
                  <Route exact path='/signup' component={Register} key={this.props.location.pathname} />
                  <Route component={Plp} path='/plp/:catId' key={this.props.location.pathname} />
              </Switch>
           </div>
         </div>
       </div>
    );
  }
}

const AppContainer = withRouter(App);

export default AppContainer;  