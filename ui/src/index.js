import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import useGlobalState from './GlobalState/useGlobalState'
import Context from './GlobalState/context'


Amplify.configure(config)

const Index = () => {
    const store = useGlobalState()
    return (
        <Context.Provider value={store}>
            <App />
        </Context.Provider>
    )
}


ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
