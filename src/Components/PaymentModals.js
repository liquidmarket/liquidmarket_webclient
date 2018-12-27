import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import accountStore from "./../Stores/AccountStore";
import { PaymentForm } from "./PaymentForm";
import { purchacePaymentRequest, canMakePaymentRequest } from "./../payments";
import { acceptOffer } from "./../Actions/Actions";

export class BuyModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            accounts: accountStore.getAll()
        }
        this.options = null;
    }
    updateOptions(options) {
        this.options = options;
        this.forceUpdate();
    }
    buy() {
        acceptOffer({
            offer_id: this.props.listing.offer_id,
            shares: Number(this.options.shares_to_buy),
            account_id: this.options.account_id,
            type: 'BUY'
        });
    }
    buyCreditCard() {
        purchacePaymentRequest(this.total, this.props.listing.short_name).then(res => {
            acceptOffer({
                offer_id: this.props.listing.offer_id,
                shares: Number(this.options.shares_to_buy),
                account_id: this.options.account_id,
                type: 'BUY'
            });
        });
    }
    get total() {
        if (this.options) {
            return this.options.shares_to_buy * this.props.listing.buy_price;
        } else {
            return 0;
        }
    }
    canPayWithCard(){
        if (this.options === null) {
            return false;
        } else {
            return canMakePaymentRequest(this.total);
        }
    }
    canPayWithAccount(){
        if (this.options === null) {
            return false;
        } else {
            return this.total < accountStore.getBalance(this.options.account_id);
        }
    }
    render(){
        if (this.canPayWithCard()) {
            return (
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader toggle={this.props.toggle}>{ this.props.listing.name }</ModalHeader>
                <ModalBody>
                    <PaymentForm updateOptions={this.updateOptions.bind(this)} accounts={this.state.accounts} listing={this.props.listing}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={!this.canPayWithAccount()} onClick={this.buy.bind(this)}>Buy</Button>{' '}
                    <Button color="primary" onClick={this.buyCreditCard.bind(this)}>Buy with card</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            )
        } else {
            return (
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true}>
                <ModalHeader toggle={this.props.toggle}>{ this.props.listing.name }</ModalHeader>
                <ModalBody>
                    <PaymentForm updateOptions={this.updateOptions.bind(this)} accounts={this.state.accounts} listing={this.props.listing}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={this.canPayWithAccount()} onClick={this.buy.bind(this)}>Buy</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
            )
        }
    }
}

export class SellModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            accounts: accountStore.getAll()
        }
        this.options = null;
    }
    updateOptions(options) {
        this.options = options;
        this.forceUpdate();
    }
    sell(){
        acceptOffer({
            offer_id: this.props.listing.offer_id,
            shares: Number(this.options.shares_to_buy),
            account_id: this.options.account_id,
            type: 'SELL'
        });
    }
    render(){
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} backdrop={true}>
            <ModalHeader toggle={this.props.toggle}>{ this.props.listing.name }</ModalHeader>
            <ModalBody>
                <PaymentForm updateOptions={this.updateOptions.bind(this)} accounts={this.state.accounts} listing={this.props.listing}/>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={this.sell.bind(this)}>Sell</Button>{' '}
                <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
        )
    }
}