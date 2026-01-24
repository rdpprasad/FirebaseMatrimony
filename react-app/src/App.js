import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import CreateBrideProfile from './pages/CreateBrideProfile';
import CreateGroomProfile from './pages/CreateGroomProfile';
import Dashboard from './pages/Dashboard';
import Help from './pages/Help';
import KundaliMatch from './pages/KundaliMatch';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Settings from './pages/Settings';
import SmartMatch from './pages/SmartMatch';
import SuccessStories from './pages/SuccessStories';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/app/create-bride-profile" component={CreateBrideProfile} />
        <Route path="/app/create-groom-profile" component={CreateGroomProfile} />
        <Route path="/app/dashboard" component={Dashboard} />
        <Route path="/app/help" component={Help} />
        <Route path="/app/kundali-match" component={KundaliMatch} />
        <Route path="/app/messages" component={Messages} />
        <Route path="/app/profile/:id" component={Profile} />
        <Route path="/app/search" component={Search} />
        <Route path="/app/settings" component={Settings} />
        <Route path="/app/smart-match" component={SmartMatch} />
        <Route path="/success-stories" component={SuccessStories} />
      </Switch>
    </Router>
  );
}

export default App;