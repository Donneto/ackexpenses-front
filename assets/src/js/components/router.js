// Dependencies
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Custom
import Home from '../views/home';
import Category from '../views/category';
import Footer from './footer';

const appRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/category">
            <Category />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default appRouter;
