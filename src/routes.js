import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Layout from "./Layout";
import Accounts from "./TableViews/Accounts";
import Prices from "./TableViews/Prices";
import Settings from "./Components/Settings";
  
const App = () => (
    <Router>
        <Layout>
            <Route exact path="/" component={Prices}/>
            <Route path="/accounts" component={Accounts}/>
            <Route path="/settings" component={Settings}/>
        </Layout>
    </Router>
  )
  export default App