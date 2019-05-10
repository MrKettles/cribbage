import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import GameChat from './GameChat';
import GameAction from './GameAction';
// import Chat from './Chat';

class Game extends Component {
	constructor(props){
		super(props);

		this.state={
			exitGame: false
		}

	}

	exitGame(){
		this.props.socket.emit('exitGame', this.props.activeGame, this.props.user);
		this.props.clearActiveGame();
		this.setState({exitGame: true});
	}

	render(){
		if(!this.props.user){
			return <Redirect to='/' />
		}
		if(this.state.exitGame){
			return <Redirect to='/home' />
		}
		return(
			<div id='Game'>
				<h1>Game</h1>
				<GameAction activeGame={this.props.activeGame} socket={this.props.socket} />
				<button id='exitGame' type='button' onClick={() => this.exitGame()}>Exit Game</button>
				<GameChat 
					activeGame={this.props.activeGame} 
					gameMessages={this.props.gameMessages} 
					updateChat={this.props.updateChat} 
					socket={this.props.socket}
					/>
			</div>
		)
	}
}

export default Game;