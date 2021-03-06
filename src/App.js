import React from 'react';
import './App.css';

//Components 
import BusinessReview from './BusinessReview';
import Home from './home';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, useParams
} from "react-router-dom";
//import { Button, Nav, NavItem, NavLink } from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, faMap, faChevronRight } from '@fortawesome/free-solid-svg-icons'
library.add(fab, faCheckSquare, faCoffee, faMap, faChevronRight)

export default function App() {

  
  return (
   
    <Router>
    <div className="container-fluid" >
    

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        
        
        <Route path="/business/:userId" component={BusinessReview} />

        <Route path="/">
          <Home />
        </Route>


      </Switch>
    </div>
    </Router>
  );

}


