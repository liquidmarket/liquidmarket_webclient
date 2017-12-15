import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Layout from "./Layout";
import Accounts from "./TableViews/Accounts";
import Prices from "./TableViews/Prices";
  
const App = () => (
    <Router>
        <Layout>
            <Route exact path="/" component={Prices}/>
            <Route path="/accounts" component={Accounts}/>
        </Layout>
    </Router>
  )
  export default App