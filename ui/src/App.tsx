import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { routes } from './App.routes';


const App = () => <div>
  <BrowserRouter >
    <Switch>
      {routes.map(({ path, component }: any) => <Route path={path} component={component} />)}
    </Switch>
  </BrowserRouter>
</div>

export default App;
