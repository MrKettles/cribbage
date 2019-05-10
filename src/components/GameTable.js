import React, {Component} from 'react';
import CreateGame from './CreateGame';
import GamesList from './GamesList';

class GameTable extends Component {
	constructor(props){
		super(props);

		this.state = {
			games: []
		}
	}

	render(){
		return(
			<div id='gameTable'>
				<CreateGame user={this.props.user} activeGame={this.props.activeGame} socket={this.props.socket} />
				<GamesList user={this.props.user} games={this.props.games} activeGame={this.props.activeGame} socket={this.props.socket} />
			</div>
		)
	}
}

export default GameTable;