import React from "react";
import { Route, matchPath, Link } from "react-router-dom";
import Characters from "./features/Characters";
import Profile from "./features/Characters/Profile";
import SignupForm from "./features/Form/Form";
import { Title } from "./theme";
import { Tab } from "semantic-ui-react";
import { getCharactersLoading } from "./features/Characters/selectors";
import { useSelector } from "react-redux";
const panes = loading => [
  {
    menuItem: {
      as: Link,
      content: "Home",
      to: "/",
      exact: true,
      key: "home"
    },
    render: () => (
      <Route path="/" exact>
        <Tab.Pane>
          <div>A Little Redux Marvel App</div>
        </Tab.Pane>
      </Route>
    )
  },
  {
    menuItem: {
      as: Link,
      content: "Characters",
      to: "/characters",
      key: "character"
    },
    render: () => (
      <>
        <Route path="/characters/:name">
          <Profile />
        </Route>
        <Route exact path="/characters">
          <Tab.Pane loading={loading}>
            <Characters />
          </Tab.Pane>
        </Route>
      </>
    )
  },
  {
    menuItem: {
      as: Link,
      content: "Form",
      to: "/form",
      key: "form"
    },
    render: () => (
      <Route path="/form">
        <Tab.Pane>
          <SignupForm />
        </Tab.Pane>
      </Route>
    )
  }
];
// Required to get a correct tab opened by default
const defaultActiveIndex = panes().findIndex(pane => {
  return !!matchPath(window.location.pathname, {
    path: pane.menuItem.to,
    exact: true
  });
});
const App = () => {
  const loading = useSelector(getCharactersLoading);
  console.log(loading);
  return (
    <div data-testid="marvelApp">
      <Title>Marvel Characters</Title>
      <Tab defaultActiveIndex={defaultActiveIndex} panes={panes(loading)} />
    </div>
  );
};

export default App;
