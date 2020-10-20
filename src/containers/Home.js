import React, { Component } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Container from 'react-bootstrap/Container';
import Login from '../components/Login'


class Home extends Component {

    render() {
        return (
            <Container fluid>
                <Header />
               <Login/>
                <Footer />

            </Container>
        );
    }
}

export default Home;