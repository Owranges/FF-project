import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react"
import Home from "./components/home/Home"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signin from './components/signin/Signin';
import Signup from './components/signup/Signup';
import EditProfile from './components/editProfile/EditProfile'
import Forum from './components/forum/Forum'
import ForumSubject from './components/forumSubject/ForumSubject'
import ProtectedRoutesAdmin from './Global/protectedRoutes/ProtectedRoutesAdmin'
import ProtectedRoutes from './Global/protectedRoutes/ProtectedRoutes'
import SingleSubject from './components/singleSubject/SingleSubject'
import Admin from './components/admin/Admin'
import MentionLegales from './components/mentionlegales/Mentionlegales';
import AdminSubject from './components/admin/AdminSubject';
import Univers from "./components/univers/Univers"

function App() {
  return (

    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/sign-in" component={Signin} />
          <Route path="/sign-up" component={Signup} />
          <ProtectedRoutes path="/edit-profile" component={EditProfile} />
          <Route path="/forum" component={Forum} />
          {/* <Route path="/forumSubject" component={ForumSubject} /> */}
          <Route path="/forum-subject" component={SingleSubject} />
          <ProtectedRoutesAdmin path="/admin" component={Admin} />
          <Route path="/mentions-legales" component={MentionLegales} />
          <ProtectedRoutesAdmin path="/admin-subject" component={AdminSubject} />
          <Route path="/univers" component={Univers} />
          <ProtectedRoutes path="/forumSubject" component={ForumSubject} />
          <Route path='*' exact={true} component={Home} />
          {/* <Route path="/profiluser" component={ProfilUser} />
          <Route path="/edit-product" component={EditProduct} />
          <Route path="/cart" component={Cart} /> */}
        </Switch>
      </Router>
    </div>

  );
}

export default App;
