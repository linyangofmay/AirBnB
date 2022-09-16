// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import {Provider} from 'react-redux';
import SpotsBrowser from './components/Spot/SpotsBrowser';
import SpotDetail from './components/Spot/SpotDetail';
import SpotCurrent from './components/Spot/SpotCurrent';
import SpotCreate from './components/Spot/SpotCreate'
import SpotEdit from './components/Spot/SpotEdit';
import ReviewCurrent from './components/Review/ReviewCurrent';
import ReviewCreate from './components/Review/ReviewCreate';
import SignupFormModal from './components/SignupFormModal';

import LoginFormModal from './components/LoginFormModal';


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (

        <Switch>
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}

          {/* <Route exact path='/login' component={LoginFormModal} /> */}

          <Route exact path="/spots/current/new" component={SpotCreate} />

          <Route exact path="/spots/current" component={SpotCurrent}/>

          <Route exact path='/reviews/current' component={ReviewCurrent} />

          <Route exact path="/spots/:spotId" component={SpotDetail} />

          <Route exact path = '/spots/:spotId/edit' component={SpotEdit} />

          <Route exact path = '/spots/:spotId/reviews' component={ReviewCreate} />

          <Route exact path="/" component={SpotsBrowser}/>


        </Switch>
      )}
    </>
  );
}

export default App;
