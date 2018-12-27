import React, { Component } from 'react';
import listingStore from "./../Stores/ListingStore";
import { refreshListings } from "./../Actions/ListingActions";
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import './Dashboard.css';
import './TradeButtons.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { BuyModal, SellModal } from "./PaymentModals";
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

class Listing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listing: props.listing,
            buyModal: false,
            sellModal: false
        }
    }
    showBuy(){
        this.setState({
            buyModal: true
        });
    }
    showSell(){
        this.setState({
            sellModal: true
        });
    }
    toggleSell(){
        this.setState({
            sellModal: !this.state.sellModal
        });
    }
    toggleBuy(){
        this.setState({
            buyModal: !this.state.buyModal
        });
    }
    render() {
    return <Col md="4" sm="6" xs="12" className="listing">
            <BuyModal listing={this.state.listing} modal={this.state.buyModal} toggle={this.toggleBuy.bind(this)}/>
            <SellModal listing={this.state.listing} modal={this.state.sellModal} toggle={this.toggleSell.bind(this)}/>
            <Card>
                <CardTitle>{ this.state.listing.organisation_name }</CardTitle>
                <CardSubtitle>{ this.state.listing.short_name }</CardSubtitle>
                <CardBody>
                    <Chart listing={this.state.listing}/>
                    <Detail listing={this.state.listing}/>
                    <Container>
                        <Row>
                            <Col md={{ size: 5, offset: 1 }}><button className="buy btn-buysell" onClick={this.showBuy.bind(this)}>Buy ${this.state.listing.buy_price}</button></Col>
                            <Col md="5"><button className="sell btn-buysell" onClick={this.showSell.bind(this)}>Sell ${this.state.listing.sell_price}</button></Col>
                        </Row>
                    </Container>
                    <div>
                        <a href={`/marketmakers/${ this.state.listing.market_maker_id }`} title={`The market maker for ${this.state.listing.short_name} is ${this.state.listing.market_maker_name}`}>{ this.state.listing.market_maker_name }</a>
                    </div>
                </CardBody>
            </Card>
        </Col>
    }
}

function Chart(props) {
    let data = props.listing.prices.map(p => { return { name: moment(p.offered_at), uv: p.price };});
    return (
        <LineChart width={320} height={130} data={data}>
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
        </LineChart>
    )
}

function Detail(props) {
    return (
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
    )
}

export default Dashboard;

