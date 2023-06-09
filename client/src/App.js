import axios from 'axios'
import React from 'react';
import { useLocation } from 'react-router';
import {Route, Switch} from 'react-router';
import { LandingPage } from './views/LandingPage/LandingPage';
import { Home } from './views/Home/Home';
import { Form } from './views/Form/Form';
import { RecipeDetail } from './views/Detail/RecipeDetail';
import { ProblemDetail } from './components/PROBLEMDETAIL/PROBLEMDETAIL';


axios.defaults.baseURL ='http://localhost:3001'


function App() {
  const location = useLocation()
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component= {LandingPage}/>
        <Route exact path='/home' component= {Home}/>
        <Route path='/create' component={Form}/>
        <Route path='detail/:id' component={RecipeDetail}/>
        <Route path='/errorDetail/:id' component={ProblemDetail} />
      </Switch>

    </div>
  );
}

export default App;
