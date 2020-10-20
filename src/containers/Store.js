import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Header from '../components/Header'
import Footer from '../components/Footer'
import Container from 'react-bootstrap/Container';
import BootstrapTable from 'reactjs-bootstrap-table';
import { connect } from 'react-redux';
import { fetchUsersByStore } from '../redux/action'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

class Dashboard extends Component {

    componentDidMount() {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            this.props.history.push("/");
        }
        this.props.fetchUsersByStore(this.props.match.params.storeId)

    }
    // onClicked = (row) => {
    //     console.log('row double clicked: ' + row.id);
    //     this.props.history.push(`/stores/${row.id}`);
    // }
    render() {
        const storeList = this.props.storeList;
        const data = [];
        storeList.map(d => {
            data.push({ 'User id': d.id, 'Store Id': d.id, 'User Name': d.name })
        })

        let columns = [
            { name: 'User id' },
            { name: 'User Name' }
        ]
        return (
            <Container fluid>
                <Header />
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard">Home</Breadcrumb.Item>
                </Breadcrumb>
                <h2>User's list from this store</h2>
                <BootstrapTable columns={columns} data={data} headers={true} onRowClicked={this.onClicked} />
                <Footer />

            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        storeList: state.storeList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsersByStore: (storeId) => dispatch(fetchUsersByStore(storeId))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));