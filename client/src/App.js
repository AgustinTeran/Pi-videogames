import './App.css';
import Landing from './components/landingPage/landing';
import {Switch,Route,Redirect} from "react-router-dom"
import Inicio from './components/index/inicio';
import Crear from './components/create/create';
import Details from './components/details/details';

function App() {
  return (
      <>
      <Switch>
            <Route exact path={"/"}>
                  <Landing/>
            </Route>
            <Route path={"/home"}>
                  <Inicio/>
            </Route>
            <Route path={"/create"}>
                  <Crear/>
            </Route>
            <Route path={"/game/:id"}>
                  <Details/>
            </Route>
            <Redirect to={"/"}></Redirect>
      </Switch>
        
      </>
  )
}

export default App;
