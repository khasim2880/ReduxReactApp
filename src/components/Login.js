import React, {  
  Component,
} from 'react';
import '.././css/Login.css';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Input } from 'reactstrap';

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {username: "", password: "", error: ""};
    this.Login = this.Login.bind(this);
  }

  Login = (e) => {        
    e.preventDefault();
    axios.post(global.config.apiUrl+"/authenticate", {"username":this.state.username, "password": this.state.password}).then((res, error) => {
    console.log(error+'-'+res);  
    if(!error){
        this.props.history.push('home');
      }else{
        this.setState({error: 'Invalid user...!'});
      }
    }).catch((err) => {
      this.setState({error: 'Invalid user...!'});
    });
  }

  handleChange = (e, field) => {
    this.setState({[field]: e.target.value});
  }

  render() {
    return (     
      <div className="vertical-center">
        <Container>
          <Form onSubmit={this.Login}>
            <Row className="mb-2 justify-content-md-center justify-content-lg-center">
              <Col xs="3" sm="2" lg="1">
                Username
              </Col>
              <Col xs="9" sm="5" lg="4">
                <Input type="text" value={this.state.username} onChange={(e) => {this.handleChange(e, "username")}} />
              </Col>
            </Row>
            <Row className="mb-2 justify-content-md-center justify-content-lg-center">
              <Col xs="3" sm="2" lg="1">
                Password
              </Col>
              <Col xs="9" sm="5" lg="4">
                <Input type="password" value={this.state.password} onChange={(e) => {this.handleChange(e, "password")}} />
              </Col>
            </Row>
            <Row className="justify-content-md-center justify-content-lg-center">
              <Col xs="12" sm="5" lg="4" className="text-center">
                <Button outline color="primary" size="md" type="submit">Login</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    )
  }
}

export default Login;  