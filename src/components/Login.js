import React, {  
  Component,
} from 'react';
import '.././css/Login.css';

export class Login extends Component {
  constructor(props){
    super(props);
    this.state = {};
    this.Login = this.Login.bind(this);
  }

  Login(){
    this.props.history.push('home');
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
              <td><input type="text" /></td>
            </tr>
            <tr>
              <td>Password</td>
              <td><input type="password" /></td>
            </tr>
            <tr>
              <td colSpan="2" className="centerAlign">
                <button type="submit" onClick={this.Login}>Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Login;  