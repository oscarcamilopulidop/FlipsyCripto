import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './componentes/MainLogin'
import Registro from './componentes/Registro'
import SignUp from "./componentes/SignUp";
import CodeConfirmation from './componentes/CodConf'
import Home from './componentes/Home'
import Verification from './componentes/Verification'
import Confirmation from './componentes/Confirmation'
import Searcher from "./componentes/Searcher";
import Menu from './componentes/Menu'
import DeckCreation from './componentes/DeckCreation';
import WizardNickname from "./componentes/WizardNickname";
import WizardPersonalInfo from "./componentes/WizardPersonalInfo";
import Wizard from "./componentes/Wizard";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/signup" component={Registro} />
        <Route path="/signup2" component={SignUp} />
        <Route path='/signin' component={Login} />
        <Route path='/confirm-code' component={CodeConfirmation} />
        <Route path='/home' component={Home} />
        <Route path='/verification' component={Verification} />
        <Route path='/confirm' component={Confirmation} />
        <Route path='/search' component={Searcher} />
        <Route path="/menu" component={Menu} exact />
        <Route path="/deck-creation" component={DeckCreation} />
        <Route path="/wizard-name" component={WizardNickname} />
        <Route path="/wizard-personal-info" component={WizardPersonalInfo} />
        <Route path="/wizard" component={Wizard}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
