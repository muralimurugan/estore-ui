import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Header from '../components/Header'
import Footer from '../components/Footer'
import Container from 'react-bootstrap/Container';
import BootstrapTable from 'reactjs-bootstrap-table';
import { connect } from 'react-redux';
import { fetchStore, deleteStore, setApiError } from '../redux/action'
import Alert from 'react-bootstrap/Alert'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAlert: false
        }
    }

    componentDidMount() {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            this.props.history.push("/");
        } else {
            this.props.fetchStore();
        }

    }
    handleView = (storeId) => {
        this.props.history.push(`/stores/${storeId}`);
    }
    handleEdit = (storeId) => {
        this.props.history.push(`/stores/edit/${storeId}`);
    }
    handleDelete = (storeId) => {
        console.log('store id', storeId)
        this.props.deleteStore(storeId);
    }
    dismissAlert = () => {
        this.props.setApiError('');
        this.props.history.push("/");
    }
    render() {
        const storeList = this.props.storeList && this.props.storeList.length ? this.props.storeList : this.props.fetchStore();
        const data = [];
        storeList && storeList.map(d => {
            data.push({ 'id': d.id, 'Store Id': d.id, 'Store Name': d.name, 'View Users': <a onClick={() => this.handleView(d.id)}>View</a>, 'Edit': <i className="fas fa-edit" onClick={() => this.handleEdit(d.id)}></i>, 'Delete': <i onClick={() => this.handleDelete(d.id)} className="fas fa-trash-alt"></i> })
        })

        let columns = [
            { name: 'Store Id' },
            { name: 'Store Name' },
            { name: 'View Users' },
            { name: 'Edit' },
            { name: 'Delete' }
        ]
        return (
            <Container fluid>
                <Header />
                {
                    this.props && this.props.errorMessage && <Alert variant="danger" onClose={this.dismissAlert} dismissible>{this.props.errorMessage}</Alert>
                }
                <BootstrapTable columns={columns} data={data} headers={true} search={true} />
                <Footer />

            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        storeList: state.storeList,
        errorMessage: state.errorMessage,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchStore: () => dispatch(fetchStore()),
        deleteStore: (storeId) => dispatch(deleteStore(storeId)),
        setApiError: () => dispatch(setApiError('')),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));