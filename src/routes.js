import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Layout from "./Layout";
import Accounts from "./TableViews/Accounts";

const Home = () => (
    <h2>Hi!</h2>
)
  
const App = () => (
    <Router>
        <Layout>
            <Route exact path="/" component={Home}/>
            <Route path="/accounts" component={Accounts}/>
        </Layout>
    </Router>
  )
  export default App