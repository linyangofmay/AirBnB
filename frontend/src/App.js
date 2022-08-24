// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import {Provider} from 'react-redux';
import SpotsBrowser from './components/Spot/SpotsBrowser';
import SpotDetail from './components/Spot/SpotDetail';
import SpotCurrent from './components/Spot/SpotCurrent';
import SpotCreate from './components/Spot/SpotCreate'
import SpotEdit from './components/Spot/SpotEdit';

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
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path = '/spots/:spotId/edit' component={SpotEdit} />

          <Route exact path="/spots/current" component={SpotCurrent}/>

          <Route exact path="/spots/:spotId" component={SpotDetail} />

          <Route exact path="/spots" component={SpotCreate} />

          <Route exact path="/" component={SpotsBrowser}/>



        </Switch>
      )}
    </>
  );
}

export default App;
