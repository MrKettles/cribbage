import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import UserList from './UserList';
import Chat from './Chat';
import PlayerInfo from './PlayerInfo';
import GameTable from './GameTable';

class Home extends Component {
	constructor(props){
		super(props);

		this.state={

		}
	}

	render(){
		if(!this.props.user){
			return <Redirect to='/' />
		}
		return(
			<div id='Home'>
				<div id='banner'><h2>Cribbage.io</h2></div>
				<UserList 
					user={this.props.user} 
					allUsers={this.props.allUsers} 
					socket={this.props.socket}
					/>
	            <Chat 
	            	user={this.props.user} 
	            	messages={this.props.messages} 
	            	updateChat={this.props.updateChat} 
	            	socket={this.props.socket}
	            	/>
	            <PlayerInfo user={this.props.user} socket={this.props.socket} />
	            <GameTable 
	            	user={this.props.user}
	            	games={this.props.games} 
	            	activeGame={this.props.activeGame} 
	            	socket={this.props.socket}
	            	/>
			</div>
		)
	}
}

export default Home;