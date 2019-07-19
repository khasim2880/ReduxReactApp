import React, {  
    Component,
  } from 'react';
import axios from 'axios';
import '.././css/chat.css';
import ChatIcon from '.././images/chat.png';
import { Container, Row, Col, Form, Button, Input, ListGroup, ListGroupItem } from 'reactstrap';
global.config = require('../config');
const socket = require('socket.io-client')(global.config.apiUrl);

export class Chat extends Component {
    constructor(props){
      super(props);
      this.state = {name: global.config.name, message: "", AllMessages: [], chatOpen: false, AllUsers: [], userConnected: null};
      this.GetMessages = this.GetMessages.bind(this);
      this.PostMessage = this.PostMessage.bind(this);
      this.openChatWindow = this.openChatWindow.bind(this);
      this.socketMethods = this.socketMethods.bind(this);
    }
  
    PostMessage = (e) => {
      e.preventDefault();
      axios.post(global.config.apiUrl+"/messages/save", {"fromName":global.config.name, "toName":this.state.userConnected, "message": (this.state.message).trim()}).then((res, error) => {
        if(!error){
          socket.emit("chat", {message: this.state.message, toName: this.state.userConnected, fromName: global.config.name});
          this.setState({message: ""});
          //this.GetMessages();
        }
      }).catch((err) => {
        if(err.response.status === 401){
            window.location.assign("/login");
        }
      });
    }

    deleteAllMessages = () =>{
        axios.post(global.config.apiUrl+"/messages/deleteall", {}).then((res, error) => {
            if(!error){
            }
        }).catch((err) => {
        });
    }

    GetMessages = (fromName, toName) => {
        axios.post(global.config.apiUrl+"/messages/get", {fromName: fromName, toName: toName}).then((res, error) => {  
          if(!error){
            this.setState({AllMessages: res.data && res.data.messages});
          }
        }).catch((err) => {
            if(err.response.status === 401){
                window.location.assign("/login");
            }
        });
      }
    
    GetAllUsers = () => {
        axios.get(global.config.apiUrl+"/allusers").then((res, error) => {  
            if(!error){
                this.setState({AllUsers: res.data && res.data.users});
                //Online users
                if(socket.listeners("onlineUsers").length === 0){
                    socket.on("onlineUsers", users =>  {
                        var onlineUsers = [];
                        for(var i=0; i<this.state.AllUsers.length; i++){
                            var user = this.state.AllUsers[i];
                            user.status = "offline";
                            if(Object.values(users).indexOf(user.name) > -1){
                                user.status = "online";
                            }
                            onlineUsers.push(user);
                        }
                    this.setState({AllUsers: onlineUsers});
                    }); 
                }
                this.joinSocket();
            }
        }).catch((err) => { });
    }  
  
    handleChange = (e, field) => {
      this.setState({[field]: e.target.value});
    }

    openChatWindow = () => {
        this.setState({chatOpen: !this.state.chatOpen});
        if(!this.state.userConnected){
            //this.GetAllUsers();
        }else{
            setTimeout(() => {
                this.socketMethods();
            }, 1000);
            this.GetMessages(global.config.name, this.state.userConnected);
        }
    }

    onlineUser = (obj) => {
        if(obj){
            this.setState({userConnected: obj.name});
            setTimeout(() => {
                this.socketMethods();
            }, 1000);
            this.GetMessages(global.config.name, obj.name);
        }else{
            this.setState({userConnected: null, AllMessages: []});
        }
    }

    joinSocket = () => {
        //Join the server or socket as client
        socket.emit('join', {name: global.config.name});
        //this.deleteAllMessages();
    }
    
    socketMethods = () => {
        //receive messages send recently from server
        if(socket.listeners("received").length === 0){
            console.log('socket recieved method initialized...!');
            socket.on("received", data => {
                //this.state.AllMessages.push(data);
                var allmsgs = this.state.AllMessages;
                allmsgs.push(data);
                this.setState({AllMessages: allmsgs});
                if(!this.state.chatOpen && this.state.userConnected !== data.fromName){
                    this.openChatWindow();
                    this.onlineUser({name: data.fromName});
                } else if(this.state.chatOpen && global.config.name === data.toName){
                    this.onlineUser({name: data.fromName});
                }
            });
        }

        if(document.getElementById("chatText")){
            //isTyping event
            document.getElementById("chatText").addEventListener("keypress", () => {
                socket.emit("typing", { toName: this.state.userConnected, fromName: global.config.name, message: "is typing..." });
                if(this.timeout){
                    window.clearTimeout(this.timeout);
                }
            });
            socket.on("notifyTyping", data  => {
                if(document.getElementById("typingText") && this.state.userConnected === data.fromName){
                    document.getElementById("typingText").innerText  =  data.fromName  +  "  "  +  data.message;
                }
            });
            //stop typing
            document.getElementById("chatText").addEventListener("keyup", () =>  {
                this.timeout = window.setTimeout(() => {
                    socket.emit("stopTyping", {message: "", toName: this.state.userConnected});
                }, 2000);
            });
            socket.on("notifyStopTyping", () =>  {
                if(document.getElementById("typingText")){
                    document.getElementById("typingText").innerText  =  "";  
                }
            }); 
        }          
    }

    componentDidMount(){
        this.GetAllUsers();
        this.socketMethods();
    }

    render() {
      return (     
        <div className="chat-container">
            <div>
                <img alt="chat" src={ChatIcon} width= "80px" onClick={this.openChatWindow} />
            </div>
            {this.state.chatOpen &&
                <Container className={this.state.userConnected ? 'chatMain chatbg' : 'chatMain'}>
                    {!this.state.userConnected && 
                        <ListGroup>
                            {this.state.AllUsers.length > 0 && this.state.AllUsers.map((obj, index)=>(
                                <div key={index}>
                                    {global.config.name !== obj.name && 
                                        <ListGroupItem className="hoverEffect" onClick={() => {this.onlineUser(obj)}}>
                                            <div>
                                                <span>{obj.name}</span>
                                                {obj.status==="online" ? <div className="online"></div> : <div className="offline"></div>}
                                            </div>
                                        </ListGroupItem>
                                    }
                                </div>
                                ))
                            }
                        </ListGroup>
                    }
                    {this.state.userConnected && 
                        <Container>
                            <span className="chatName">Chat With {this.state.userConnected}</span>
                            <span className="chatClose" onClick={() => {this.onlineUser()}}>X</span>
                            <Container className="chatHistory">
                                {this.state.AllMessages.length > 0 && this.state.AllMessages.map((obj, index)=>(
                                    <Row key={index}>
                                        {global.config.name === obj.fromName ? <Col className="me text-right" xs="12">{obj.message}</Col> : (this.state.userConnected === obj.toName ? <Col className="me text-right" xs="12">{obj.message}</Col> : <Col className="other text-left" xs="12">{obj.message}</Col>)}
                                    </Row>
                                ))
                                }
                            </Container>
                            <Form onSubmit={this.PostMessage}>
                                <Row className="mb-2 justify-content-md-center justify-content-lg-center">
                                    <Col xs="9">
                                        <Input type="textarea" id="chatText" value={this.state.message} onChange={(e) => {this.handleChange(e, "message")}} />
                                        <span id="typingText"></span>
                                    </Col>
                                    <Col xs="3">
                                        <Button outline color="primary" size="md" type="submit">Send</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    }
                </Container>
            }
        </div>
      )
    }
  }
  
  export default Chat;  