import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import { clearToken, fetchUserData, getToken, fetchAllActivites } from "./api";

import {
  Login,
  Register,
  Home,
  Activities,
  Routines,
  MakeRoutine,
  MyRoutines,
} from "./components";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({});
  const [activities, setActivities] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  useEffect(async () => {
    if (isLoggedIn) {
      try {
        const data = await fetchUserData();
        setCurrentUser(data.username);
        const grabActivities = await fetchAllActivites();
        setActivities(grabActivities);
      } catch (error) {
        console.error(error);
      }
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <div className="headerbar">
        <h1>Fitness Tracker</h1>
        <div>
          <Link className="navlink" to="/">
            Home
          </Link>
          <Link className="navlink" to="/activities">
            Activities
          </Link>
          <Link className="navlink" to="/routines">
            Routines
          </Link>
          {isLoggedIn ? (
            <Link className="Link" to="/createRoutine">
              Create Routine
            </Link>
          ) : null}
          {isLoggedIn ? (
            <Link className="Link" to="/myroutines">
              My Routines
            </Link>
          ) : null}
          {!isLoggedIn ? (
            <Link className="navlink" to="/login">
              Login
            </Link>
          ) : null}
          {!isLoggedIn ? (
            <Link className="navlink" to="/register">
              Sign Up
            </Link>
          ) : null}{" "}
          {isLoggedIn ? (
            <Link
              className="Link"
              onClick={() => {
                clearToken();
                setIsLoggedIn(false);
                alert("You have logged out");
              }}
              to="/"
            >
              Log Out
            </Link>
          ) : null}
        </div>
      </div>
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/register">
            <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/activities">
            <Activities
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              activities={activities}
              setActivities={setActivities}
            />
          </Route>
          <Route path="/routines">
            <Routines />
          </Route>
          <Route path="/myRoutines">
            <MyRoutines
              currentUser={currentUser}
              activities={activities}
              setActivities={setActivities}
            />
          </Route>
          <Route path="/createRoutine">
            <MakeRoutine />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
