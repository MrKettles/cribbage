import React, { Component } from 'react';

class Chat extends Component {
	constructor(props){
		super(props);

		this.state = {
			message: ''
		}
	}

	componentDidUpdate(){
		this.scrollChat();
	}

	typingHandler(e){
		this.setState({message: e.target.value});
	}

	submitHandler(e){
		e.preventDefault();
		if(this.state.message.length > 0){
			this.props.updateChat(this.state.message, false);
			this.setState({message: ''});
		}
	}

	scrollChat(){
		let chats = document.getElementById('chats');
		if (!chats) return false;
		if(chats.scrollHeight > chats.clientHeight){
			chats.scrollTop = chats.scrollHeight;
		}
	}

	render(){
		return (
			<div id='chat'>
				<h2>Chat</h2>
				<div id='chats'>{
					this.props.messages.map((message, index) => 
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

export default Chat;