import React from "react";

import "./styles/App.scss";

// libs
import { HashRouter, Route, Redirect } from "react-router-dom";

// screens
import MainPage from "./screens/MainPage";
import MainApp from "./screens/MainApp";
import Login from "./screens/Login";

// components
import TopBar from "./components/TopBar";

const screens = [
  {
    label: "redirectRoot",
    path: "/",
    exact: true,
    component: props => <Redirect to={`/login`} />
  },
  {
    label: "Landing",
    path: "/landing",
    exact: true,
    component: MainPage
  },
  {
    label: "App",
    path: `/login`,
    component: Login,
    topBar: true
  },
  { path: `/app`, exact: true, component: MainApp }
];

function App() {
  return (
    <HashRouter basename={`/`}>
      <div className="App">
        {/*<TopBar screens={screens.filter(e => e.topBar)} />*/}
        <div className="pageContent">
          {screens.map((e, i) => (
            <Route
              path={e.path}
              exact={e.exact}
              component={e.component}
              key={`route_${i}`}
            />
          ))}
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
