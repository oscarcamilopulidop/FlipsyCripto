import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './componentes/MainLogin'
import Registro from './componentes/Registro'
import CodeConfirmation from './componentes/CodConf'
import Home from './componentes/Home'
import Verification from './componentes/Verification'
import Confirmation from './componentes/Confirmation'
import Searcher from "./componentes/Searcher"
import Menu from './componentes/Menu'
import Decks from './componentes/Decks'
//import FlashcardsCreation from './componentes/FlashcardsCreation'
//<!--Route path='/cards-creation' component={FlashcardsCreation} /-->


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/signup" component={Registro} />
        <Route path='/signin' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/confirm-code' component={CodeConfirmation} />
        <Route path='/home' component={Home} />
        <Route path='/verification' component={Verification} />
        <Route path='/confirm' component={Confirmation} />
        <Route path='/search' component={Searcher} />
        <Route path="/menu" component={Menu} exact />
        <Route path='/decks' component={Decks} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
