import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Layout from "./Layout";
import Accounts from "./TableViews/Accounts";
import Prices from "./TableViews/Prices";
import Settings from "./Components/Settings";
import Help from "./Components/Help";
import ShareHoldings from "./TableViews/ShareHoldings";
import Trades from "./TableViews/Trades";
  
const App = () => (
    <Router>
        <Layout>
            <Route exact path="/" component={Prices}/>
            <Route path="/accounts" component={Accounts}/>
            <Route path="/markets" component={Prices}/>
            <Route path="/trades" component={Trades}/>
            <Route path="/settings" component={Settings}/>
            <Route path="/shareholdings" component={ShareHoldings}/>
            <Route path="/help" component={Help}/>
        </Layout>
    </Router>
  )
  export default App