import React, { Component } from 'react';
import shareholdingStore from "./../Stores/ShareHoldingStore";
import { refreshShareHoldings } from "./../Actions/ShareHoldingActions";

class ShareHoldings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareholdings: shareholdingStore.getAll()
        }
    }
    componentWillMount(){
        shareholdingStore.on("change", () => {
            this.setState({ shareholdings: shareholdingStore.getAll() });
        });
        refreshShareHoldings();
    }
    componentWillUnmount(){
        shareholdingStore.removeAllListeners();
    }
    render(){
        let accounts = this.state.shareholdings.map(sh => <AccountShareholding key={sh.account_id} account={sh}/>);
        return <div>
            {accounts}
        </div>
    }
}

function AccountShareholding(props) {
    return(
        <div>
            <h3>{ props.account.name }</h3>
            <ShareholdingTable shareholdings={props.account.shareholdings}/>
        </div>
    );
}

function ShareholdingTable(props) {
    let tableRecords = props.shareholdings.map(sh => <ShareholdingRecord key={sh.short_name} shareholding={sh} />);
    return (
        <table>
            <thead>
                <tr>
                    <th>Company</th>
                    <th>Price</th>
                    <th>Shares</th>
                    <th>Net Value</th>
                </tr>
            </thead>
            <tbody>
                { tableRecords }
            </tbody>
        </table>
    )
}

function ShareholdingRecord(props) {
    let sh = props.shareholding;
    return <tr>
            <td>{ sh.organisation_name + ' (' + sh.short_name + ')' }</td>
            <td>{ sh.current_price }</td>
            <td>{ sh.shares }</td>
            <td>{ sh.current_price * sh.shares }</td>
        </tr>
}

export default ShareHoldings;
