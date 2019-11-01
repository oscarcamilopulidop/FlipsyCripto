import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Components/MainLogin'
import SignUp from './Components/SignUp'
import CodeConfirmation from './Components/CodConf'
import Home from './Components/Home'
import Verification from './Components/Verification'
import Confirmation from './Components/Confirmation'
import Searcher from "./Components/Searcher";
import Menu from './Components/Menu'
import DeckCreation from './Components/DeckCreation';
import WizardNickname from "./Components/WizardNickname";
import WizardPersonalInfo from "./Components/WizardPersonalInfo";
import Wizard from "./Components/Wizard";
import FlashcardsCreation from './Components/FlashcardsCreation'
import Decks from './Components/Decks'
import StudyCards from './Components/StudyCards'
import CreateCard from './Components/CreateCard'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/signup" component={SignUp} />
        <Route path='/signin' component={Login} />
        <Route path='/login' component={Login} />
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
        <Route path='/cards-creation' component={FlashcardsCreation} />
        <Route path='/decks' component={Decks} />
        <Route path="/study" component={StudyCards} />
        <Route path="/createCard" component={CreateCard}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
