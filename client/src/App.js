import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import PrivateRoute from "./components/Routing/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import addExperience from "./components/profile-forms/addExperience";
import addEducation from "./components/profile-forms/addEducation";
import Profiles from "./components/Profiles/Profiles";
import Profile from "./components/profile/Profile";
import Post from "./components/post/Post";
import SingelPost from "./components/SinglePost/SingelPost";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";

function App() {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />

          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={addExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={addEducation}
              />
              <Route exact path="/profiles" component={Profiles} />
              <Route path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/posts" component={Post} />
              <PrivateRoute exact path="/posts/:id" component={SingelPost} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
}

export default App;
