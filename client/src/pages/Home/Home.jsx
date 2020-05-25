import React from 'react';
import { Router, Route } from "react-router-dom";
import Navigator from './navigator';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import history from '../../history';
import Script from './content/Script';
import Note from './content/Note';
import Todo from './content/Todo';
import CreateScript from './content/CreateScript';
const Home = ({ location }) => {
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: 'dark',
        },
      }),
    [],
  );
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "flex" }}>
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "stretch", width: 240 }}>
          <Navigator></Navigator>
        </div>
        <div style={{ padding: "1rem", background: "#212121", width: "100%" }}>
          <Router history={history}>
            <Route exact path="/home/script" component={Script} />
            <Route exact path="/home/script/create" component={CreateScript} />
            <Route exact path="/home/note" component={Note} />
            <Route exact path="/home/Todo" component={Todo} />
          </Router>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Home;