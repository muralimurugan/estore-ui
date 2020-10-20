import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from "react-router-dom";
import Header from '../components/Header'
import Footer from '../components/Footer'
import Container from 'react-bootstrap/Container';
import { fetchStoreDetails, updateStore } from '../redux/action'
import { connect } from 'react-redux';

class StoreEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            mobile: '',
            name: '',
        }

    }
    componentDidMount() {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            this.props.history.push("/");
        } else {
            this.props.fetchStoreDetails(this.props.match.params.storeId);
        }
    }
    componentWillReceiveProps(newProps, prevProps) {
        if (newProps.storeDetail && newProps.storeDetail && !prevProps.storeDetail) {
            this.setState({
                email: newProps.storeDetail.email,
                mobile: newProps.storeDetail.mobile,
                name: newProps.storeDetail.name
            })
        }

    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateStore(this.props.match.params.storeId,JSON.stringify(this.state))
    }
    render() {
        const { name,email,mobile } = this.state;
        console.log(this.state)
        return (
            <Container fluid>
                <Header />
                <Form>
                    <Form.Group controlId="formBasicStoreName">
                        <Form.Label>Store Name</Form.Label>
                        <Form.Control type="text" name="name" placeholder="Enter Store Name" value={name} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Store Email Id</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter Store Email" value={email} onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Store Mobile</Form.Label>
                        <Form.Control type="text" name="mobile" placeholder="Enter Store Mobile" value={mobile} onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={this.handleSubmit}>
                        Update
            </Button>
                </Form>
                <Footer />
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        storeDetail: state.storeDetail
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchStoreDetails: (storeId) => dispatch(fetchStoreDetails(storeId)),
        updateStore: (storeId,payload) => dispatch(updateStore(storeId,payload)),
        
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StoreEdit));