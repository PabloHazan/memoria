import React from 'react';
import './axiosConfig';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { routes } from './App.routes';
import { Container, Grid } from '@material-ui/core';
import AppHeader from './AppHeader';
import styled from 'styled-components';
import { store } from './core/redux/store';
import { Provider } from 'react-redux';
import Spinner from './shared/loader/components/spinnerContainer';
import { Config, useFindConfig } from './modules/photos/hooks/findConfig.hook';
import { useAudio } from './modules/photos/hooks/useAudio.hook';
import { AppProvider } from './AppContext';


interface BodyProps {
  config: Config | null;
}

const Body = ({ config }: BodyProps) => {
  const audioControl = useAudio(config?.sound, { repeat: true });

  return <AppProvider value={{ audioControl }}>
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
          {config && routes.map(({ path, component }: any, index: number) => <Route key={index} path={path} component={component} />)}
        </Switch>
      </Grid>
    </Grid>
  </AppProvider>
}

const BodyContainer = () => {
  const config = useFindConfig();
  return <Body config={config} />
}

const App = () => <Provider store={store}>
  <Container>
    <BrowserRouter >
      <Spinner />
      <BodyContainer />
    </BrowserRouter>
  </Container>
</Provider>


const StyledApp = styled(App)`
  /* margin: 100px 100px; */
`;

export default StyledApp;
