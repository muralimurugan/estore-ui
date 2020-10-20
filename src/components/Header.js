import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import '../containers/Home.css'
import { withRouter } from "react-router-dom";

class Header extends Component {
    logout = () => {
        localStorage.setItem('jwt','')
        this.props.history.push("/");
    }
    render() {
        return (
            <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
                <Navbar.Brand className="company-name" >Estore</Navbar.Brand>
               {
                   localStorage.getItem('jwt') ? <Button variant="light" onClick={this.logout}>Logout</Button> : ''
               } 
            </Navbar>
        );
    }
}

export default withRouter(Header)