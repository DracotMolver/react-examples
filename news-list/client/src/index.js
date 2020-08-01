import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
// Containers
import HackNews from './containers/HackNews';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: {
      main: '#ff9800'
    }
  }
});

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <HackNews />
    </ThemeProvider>
  </StrictMode>,
  document.getElementById('root')
);

