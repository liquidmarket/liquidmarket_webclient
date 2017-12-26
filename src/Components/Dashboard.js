import React, { Component } from 'react';
import listingStore from "./../Stores/ListingStore";
import { refreshListings } from "./../Actions/ListingActions";
import { Container, Row, Col } from 'reactstrap';
import './Dashboard.css';
import './TradeButtons.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { purchacePaymentRequest } from "./../payments";
import moment from 'moment'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: listingStore.getAll()
        }
    }
    componentWillMount(){
        listingStore.on("change", () => {
            this.setState({ listings: listingStore.getAll() });
        });
        refreshListings();
    }
    componentWillUnmount(){
        listingStore.removeAllListeners();
    }
    render() {
        let listings = this.state.listings.map(l => <Listing key={l.id} listing={l}/>);
        return <Container>
            <Row>
                { listings }
            </Row>
        </Container>
    }
}

function Listing(props) {
    let data = props.listing.prices.map(p => { return { name: moment(p.offered_at), uv: p.price };});
    return <Col md="4" sm="6" xs="12" className="listing">
            <h4>{`${props.listing.organisation_name} (${props.listing.short_name})`}</h4>
            <LineChart width={320} height={130} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </LineChart>
            <div>
                <dl>
                    <dt>Price</dt>
                    <dd>${ props.listing.price }</dd>
                    <dt>Spread</dt>
                    <dd>${ props.listing.spread }</dd>
                    <dt>Market Capitalization</dt>
                    <dd>${ Number(props.listing.total_shares * props.listing.price).toLocaleString() }</dd>
                    <dt>Issued Shares</dt>
                    <dd>{ props.listing.total_shares.toLocaleString() }</dd>
                </dl>
            </div>
            <TradeButtons listing={props.listing} />
            <div>
                <a href={`/marketmakers/${ props.listing.market_maker_id }`} title={`The market maker for ${props.listing.short_name} is ${props.listing.market_maker_name}`}>{ props.listing.market_maker_name }</a>
            </div>
        </Col>
}

class TradeButtons extends Component{
    querySharesRequired(){
        let x = prompt('Number of shares:','1000');
        return Number.parseInt(x);
    }
    confirmBuyTrade(shares){
        return window.confirm(`Are you sure you want to buy ${ shares } shares in ${ this.props.listing.organisation_name }(${ this.props.listing.short_name }) for $${ this.props.listing.buy_price * shares }`);
    }
    confirmSellTrade(shares){
        return window.confirm(`Are you sure you want to sell ${ shares } shares in ${ this.props.listing.organisation_name }(${ this.props.listing.short_name }) for $${ this.props.listing.sell_price * shares }`);
    }
    sell(){
        let shares = this.querySharesRequired();
        let confirm = this.confirmSellTrade(shares);
        if (confirm) {
            alert('not implemented');
        }
    }
    buy(){
        let shares = this.querySharesRequired();
        let confirm = this.confirmBuyTrade(shares);
        let total = this.props.listing.buy_price * shares;
        let short_description = `${shares} x ${ this.props.listing.organisation_name }(${ this.props.listing.short_name }) at $${this.props.listing.buy_price} each`
        if (confirm && window.PaymentRequest) {
            purchacePaymentRequest(total, short_description);
        } else if (confirm) {
            alert('not implemented');
        }
    }
    render(){
        return (<Container>
                <Row>
                    <Col md={{ size: 5, offset: 1 }}><button className="buy btn-buysell" onClick={this.buy.bind(this)}>Buy ${this.props.listing.buy_price}</button></Col>
                    <Col md="5"><button className="sell btn-buysell" onClick={this.sell.bind(this)}>Sell ${this.props.listing.sell_price}</button></Col>
                </Row>
            </Container>)
    }
}

export default Dashboard;