import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import App from './App';
import theme from "./styles/theme"

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
