import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import { Auth } from 'aws-amplify';
// import { LinkContainer } from 'react-router-bootstrap';

// import './Login.css';

export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			email: '',
      codeEmail: '',
			password: '',
      code: '',
      newPwd: ''
		};
	}

	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}

  validateEmailForm() {
    return this.state.codeEmail.length > 0;
  }

  validateNewPwdForm() {
    return this.state.newPwd.length > 0 && this.state.code.length > 0;
  }

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = async event => {
		event.preventDefault();

		this.setState({ isLoading: true });

		try {
			await Auth.signIn(this.state.email, this.state.password);
			this.props.userHasAuthenticated(true);
			this.props.history.push('/');
		} catch (e) {
			alert(e.message);
			this.setState({ isLoading: false });
		}
	};

  handleSendCode = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.forgotPassword(this.state.codeEmail);
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  handleNewPwd = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.forgotPasswordSubmit(this.state.codeEmail, this.state.code, this.state.newPwd)
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };


	render() {
		return (
			<div className="Login">
				<form onSubmit={this.handleSubmit}>
					<FormGroup controlId="email" bsSize="large">
						<ControlLabel>Email</ControlLabel>
						<FormControl type="email" value={this.state.email} onChange={this.handleChange} />
					</FormGroup>
					<FormGroup controlId="password" bsSize="large">
						<ControlLabel>Password</ControlLabel>
						<FormControl value={this.state.password} onChange={this.handleChange} type="password" />
					</FormGroup>
					<LoaderButton
						block
						bsSize="large"
						disabled={!this.validateForm()}
						type="submit"
						text="Login"
					/>
				</form>
        <p> Forgot password? </p>
        <form onSubmit={this.handleSendCode}>
            <FormGroup controlId="codeEmail" bsSize="large">
              <p>Give us an email to send you a verification code</p>
              <FormControl value={this.state.codeEmail} onChange={this.handleChange} type="codeEmail" />
            </FormGroup>
            <LoaderButton
              block
              bsSize="large"
              disabled={!this.validateEmailForm()}
              type="submit"
              text="Send Code"
            />
        </form>
        <form onSubmit={this.handleNewPwd}>
            <FormGroup controlId="code" bsSize="large">
              <ControlLabel>Code</ControlLabel>
              <FormControl value={this.state.code} onChange={this.handleChange} type="code" />
            </FormGroup>
          <FormGroup controlId="newPwd" bsSize="large">
            <ControlLabel>New Password</ControlLabel>
            <FormControl value={this.state.newPwd} onChange={this.handleChange} type="password" />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateNewPwdForm()}
            type="submit"
            text="Confirm"
          />
        </form>
			</div>
		);
	}
}
