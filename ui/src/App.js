import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './componentes/MainLogin'
import Registro from './componentes/Registro'
import CodeConfirmation from './componentes/CodConf'
import Home from './componentes/Home'
import Verification from './componentes/Verification'
import Confirmation from './componentes/Confirmation'
import Searcher from "./componentes/Searcher";
import Menu from './componentes/Menu'
import DeckCreation from './componentes/DeckCreation';
import DeckEdition from './componentes/DeckEdition';
import WizardNickname from "./componentes/WizardNickname";
import WizardPersonalInfo from "./componentes/WizardPersonalInfo";
import Wizard from "./componentes/Wizard";
import FlashcardsCreation from './componentes/FlashcardsCreation'
import QuestionnairesList from './componentes/QuestionnairesList'
import Decks from './componentes/Decks'
import StudyCards from './componentes/StudyCards'
import CreateCard from './componentes/CreateCard'
import EditCard from './componentes/EditCard'
import Question from './componentes/Question'
import Congratulations from './componentes/Congratulations'

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
        <Route path="/deck-creation" component={DeckCreation} />
        <Route path="/deck-edition" component={DeckEdition} />
        <Route path="/wizard-name" component={WizardNickname} />
        <Route path="/wizard-personal-info" component={WizardPersonalInfo} />
        <Route path="/wizard" component={Wizard}/>
        <Route path="/questionnaires-list" component={QuestionnairesList}/>
        <Route path='/cards-creation' component={FlashcardsCreation} />
        <Route path='/decks' component={Decks} />
        <Route path="/study" component={StudyCards} />
        <Route path="/createCard" component={CreateCard}/>
        <Route path="/editCard" component={EditCard}/>
        <Route path="/question" component={Question}/>
        <Route path="/congratulations" component={Congratulations}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
