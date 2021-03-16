import React from 'react';
import './axiosConfig';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { routes } from './App.routes';
import { Container, Grid } from '@material-ui/core';
import AppHeader from './AppHeader';
import styled from 'styled-components';


const App = () => <Container>
  <BrowserRouter >
    <Grid
      container
      direction='column'
      justify='space-between'
      alignItems='stretch'
      spacing={2}
    >
      <Grid item>
        <AppHeader />
      </Grid>
      <Grid item>
        <Switch>
          {routes.map(({ path, component }: any) => <Route path={path} component={component} />)}
        </Switch>
      </Grid>
    </Grid>
  </BrowserRouter>
</Container>

const StyledApp = styled(App)`
  /* margin: 100px 100px; */
`;

export default StyledApp;
