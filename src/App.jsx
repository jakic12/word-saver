import React from "react";

import "./styles/App.scss";

// libs
import { BrowserRouter, Route } from "react-router-dom";

// screens
import MainPage from "./screens/MainPage";
import MainApp from "./screens/MainApp";
import Login from "./screens/Login";

// components
import TopBar from "./components/TopBar";

const screens = [
  /*{
    label: "Landing",
    path: "/",
    exact: true,
    component: MainPage
  },*/
  { label: "App", path: "/", exact: true, component: Login, topBar: true },
  { path: "/app", exact: true, component: MainApp }
];

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
