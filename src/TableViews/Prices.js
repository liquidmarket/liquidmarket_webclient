import React, { Component } from 'react';
import priceStore from "./../Stores/PriceStore";
import { refreshPrices } from "./../Actions/PriceActions";
import './Tables.css';

class Prices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prices: priceStore.getAll()
        }
    }
    componentWillMount(){
        priceStore.on("change", () => {
            this.setState({ prices: priceStore.getAll() });
        });
        refreshPrices();
    }
    componentWillUnmount(){
        priceStore.removeAllListeners();
    }
    render(){
        return <PricesTable prices={this.state.prices} />
    }
}

function PricesTable(props) {
    let tableRecords = props.prices.map(p => <PriceRecord key={p.short_name} price={p} />);
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Short Name</th>
                    <th>Total Shares</th>
                    <th>Price</th>
                    <th>Spread</th>
                </tr>
            </thead>
            <tbody>
                { tableRecords }
            </tbody>
        </table>
    )
}

function PriceRecord(props) {
    let p = props.price;
    return <tr>
        <td>{ p.organisation_name }</td>
        <td>{ p.short_name }</td>
        <td>{ p.total_shares }</td>
        <td>{ p.price }</td>
        <td>{ p.spread }</td>
    </tr>
}

export default Prices;
