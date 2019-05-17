import React, {  
  Component,
} from 'react';
import '.././css/Login.css';
import axios from 'axios';

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {username: "", password: "", error: ""};
    this.Login = this.Login.bind(this);
  }

  Login = () => {
    axios.post("http://localhost:1330/authenticate", {"username":this.state.username, "password": this.state.password}).then((res, error) => {
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
      <div id="loginContent">
        <table>
          <tbody>
            <tr>
              <td colSpan="2" className="centerAlign">Login</td>
            </tr>
            <tr>
              <td>Username</td>
              <td><input type="text" value={this.state.username} onChange={(e) => {this.handleChange(e, "username")}} /></td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input type="password" value={this.state.password} onChange={(e) => {this.handleChange(e, "password")}} /></td>
            </tr>
            <tr>
              <td colSpan="2" className="centerAlign">
                <button type="submit" onClick={this.Login}>Submit</button>
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="centerAlign">
                <label>{this.state.error}</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Login;  