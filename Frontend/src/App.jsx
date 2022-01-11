import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Menu from "./Pages/Menu";
import Register from "./Pages/Register";
import Single_Product from "./Pages/Single_Product";
import Cart from "./Pages/Cart"
import Success from "./Pages/Success";
import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const user=useSelector((state) => state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/menu">
          <Menu />
        </Route>
        <Route path="/product/:id">
          <Single_Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
          </Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/success">
          <Success />
        </Route>
      </Switch>
    </Router>
  )
};

export default App;