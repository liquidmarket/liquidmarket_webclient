import React, { Component } from 'react';
import addressStore from "./../Stores/AddressStore";
import { refreshAddresses, updateAddress, createAddress, deleteAddress } from "./../Actions/AddressActions";

class Addresses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: addressStore.getAll()
        }
    }
    componentWillMount(){
        addressStore.on("change", () => {
            this.setState({ addresses: addressStore.getAll() });
        });
        refreshAddresses();
    }
    componentWillUnmount(){
        addressStore.removeAllListeners();
    }
    addAddress(){
        let name = prompt('address', '123 Fake Street');
        createAddress(name);
    }
    render(){
        return <div>
            <AddressTable addresses={this.state.addresses} />
            <br/>
            <button onClick={this.addAddress.bind(this)}>Add Address</button>
        </div>
    }
}

function AddressTable(props) {
    let tableRecords = props.addresses.map(a => <AddressRecord key={a.id} address={a} />);
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Address</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                { tableRecords }
            </tbody>
        </table>
    )
}

class AddressRecord extends Component{
    update(){
        let newName = prompt('New name:', this.props.address.address);
        updateAddress(this.props.address.id, newName);
    }
    delete(){
        let deletionConfirmed = window.confirm(`Are you sure you want to delete: ${this.props.address.address}`);
        if (deletionConfirmed) {
            deleteAddress(this.props.address.id);
        }
    }
    render(){
        let a = this.props.address;
        return <tr>
                <td>{ a.id }</td>
                <td>{ a.address }</td>
                <td><button onClick={this.update.bind(this)}>Update</button></td>
                <td><button onClick={this.delete.bind(this)}>Delete</button></td>
            </tr>
    }
}

export default Addresses;
