import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import App from './App';
// import './index.css';
import config from './config.js'


Amplify.configure({
	Auth: {
		mandatorySignIn: true,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID
	},
});

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
