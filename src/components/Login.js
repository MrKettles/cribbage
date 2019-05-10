import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			nickname: '',
			toHome: false
		}
	}

	handleType(e){
		this.setState({nickname: e.target.value});
	}

	handleClick(e){
		e.preventDefault();
		if(this.state.nickname.length < 4 || this.state.nickname.length > 16){
			let loginInput = document.getElementById('loginInput');
			loginInput.value = '';
			this.setState({nickname: ''});
			loginInput.setAttribute('placeholder', 'Must be between 4 and 16 characters');
			return;
		}
		this.props.loginComplete(this.state.nickname);
		this.props.socket.emit('login', this.state.nickname);
		this.setState({nickname: ''});
		this.setState({toHome: true});
	}

	render() {
		if(this.state.toHome){ return <Redirect to='/home' /> };
		return (
			<div id='login'>
				<form id='loginForm'>
					<h1 className='scripty'>Cribbage.io</h1>
					<input 
						id='loginInput' 
						type='text' 
						title='Must be 4-16 characters' 
						autoFocus 
						required 
						value={this.state.nickname}
						onChange={(e)=> this.handleType(e) }/>
					<button 
						id='loginButton' 
						type='submit' 
						onClick={(e) => this.handleClick(e)}
					>Submit Nickname</button>
				</form>
			</div>
		);
	}
}

export default Login;