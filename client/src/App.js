import './App.css';
import Landing from './components/landingPage/landing';
import {Route} from "react-router-dom"
import Inicio from './components/index/inicio';
import Crear from './components/create/create';
import Details from './components/details/details';

function App() {
  return (
      <>
        <Route exact path={"/"}>
              <Landing/>
        </Route>
        <Route path={"/inicio"}>
              <Inicio/>
        </Route>
        <Route path={"/create"}>
              <Crear/>
        </Route>
        <Route path={"/game/:id"}>
            <Details/>
        </Route>
      </>
  )
}

export default App;
