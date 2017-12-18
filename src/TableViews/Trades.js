import React, { Component } from 'react';
import tradeStore from "./../Stores/TradeStore";
import { refreshTrades } from "./../Actions/TradeActions";

class Trades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trades: tradeStore.getAll()
        }
    }
    componentWillMount(){
        tradeStore.on("change", () => {
            this.setState({ trades: tradeStore.getAll() });
        });
        refreshTrades();
    }
    componentWillUnmount(){
        tradeStore.removeAllListeners();
    }
    render(){
        return <TradesTable trades={this.state.trades} />
    }
}

function TradesTable(props) {
    let tableRecords = props.trades.map(t => <TradeRecord key={t.id} trade={t} />);
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Company</th>
                    <th>Shares</th>
                    <th>Total Price</th>
                    <th>Time of Trade</th>
                    <th>Buyer</th>
                    <th>Seller</th>
                    <th>User</th>
                </tr>
            </thead>
            <tbody>
                { tableRecords }
            </tbody>
        </table>
    )
}

function TradeRecord(props) {
    let t = props.trade;
    return <tr>
        <td>{ t.id }</td>
        <td>{ `${ t.organisation_name } (${t.short_name})` }</td>
        <td>{ t.shares_traded }</td>
        <td>{ t.total_price }</td>
        <td>{ t.occured_at }</td>
        <td>{ t.buyer_name }</td>
        <td>{ t.seller_name }</td>
        <td>{ t.traded_by_name }</td>
    </tr>
}

export default Trades;
