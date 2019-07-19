import React, {  
    Component,
  } from 'react';
  import { connect } from 'react-redux';
  import { withRouter } from 'react-router-dom';
  import axios from 'axios';
  import { Container, Row, Col } from 'reactstrap';
  import logo from '../images/logo.png';
  import '.././css/Plp.css';
  import {
    getProductEvent,
  } from '.././actions/pdpAction';
  
  class Pdp extends Component {
    constructor(props){
      super(props);
      this.state = {product: {}};
    }
  
    componentDidMount(){
      this.getProduct();
    }
  
    getProduct = () => {
      const { match: { params } } = this.props;
      axios.post(global.config.apiUrl + "/prod/product", {id: params.productId}).then((res) => {
        const product = res.data;
        this.setState({product});
        this.props.getProductEvent({product});
      }).catch((err) => {
        window.location.assign("/login");      
        //this.props.history.push('login');
      });
    }
  
    render() {
      return (
        <Container>
          <Row>
            <Col xs="6" sm="4" lg="3">
              <img alt="gem" id="productImage" src={logo} />
            </Col>
          </Row>
        </Container>
      )
    }
  }
  
  const mapStateToProps = (state, ownProps) => ({  
    ...state.product,
  });
  
  const mapDispatchToProps = { 
    getProductEvent,
  };
  
  const childContainer = withRouter(connect(  
    mapStateToProps,
    mapDispatchToProps
  )(Pdp));
  
  export default childContainer;  