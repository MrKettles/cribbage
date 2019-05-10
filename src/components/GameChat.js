import React from 'react';
import Chat from './Chat';

class GameChat extends Chat {
	constructor(props){
		super(props);

		this.state = {
			message: ''
		}
	}

	submitHandler(e){
		e.preventDefault();
		if(this.state.message.length > 0){
			this.props.updateChat(this.state.message, this.props.activeGame);
			this.setState({message: ''});
		}
	}

	render(){
		return (
			<div id='gameChat'>
				<h2>Private Chat</h2>
				<div id='gameChats'>{
					this.props.gameMessages.map((message, index) => 
						<p key={index}><span className='userId'>{message.user}</span> {message.msg}</p>
					)
				}</div>
				<form id='chatForm'>
					<input 
						type='text'
						value={this.state.message}
						onChange={e => this.typingHandler(e)}
						required
					/>
					<button type='submit' onClick={e => this.submitHandler(e)}>↑</button>
				</form>
			</div>
		)
	}
}

export default GameChat;