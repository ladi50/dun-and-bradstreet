import {Switch, Redirect, Route, BrowserRouter} from "react-router-dom";
import Home from "./pages/Home/Home";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} exact>
          <Home />
        </Route>
        <Redirect to={"/"} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;