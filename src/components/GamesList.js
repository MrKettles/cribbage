import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class GamesList extends Component {
	constructor(props){
		super(props);

		this.state = {
		}
	}

	componentDidMount(){
		this.props.socket.on('addToGame', () => {
			this.setState({joinGame: true});
		})
	}

	handleJoin(e){
		let gameIndex = e.target.attributes.getNamedItem('index').value;
		let gameId = this.props.games[gameIndex].gameId; 
		this.props.socket.emit('joinGame', gameId, this.props.user);
	}

	handleWatch(e){

	}

	render(){
		if(this.state.joinGame){
			return <Redirect to='/game' />
		}
		return(
			<div id='gamesList'>
				<h4>Active Games</h4>
				{this.props.games ? this.props.games.map((game, index) => 
					<div className='gameSummary' key={index}>
						<p><span class='player'>Players: </span>
							{game.players[0]}
							{game.players[1] ? (' & ' + game.players[1]) : <i> Waiting for opponent</i>}
						</p>
						{ game.options.isViewable ? <button class='watchButton' type='button' onClick={e => this.handleWatch(e)} >Watch Game</button> : <p class='cantWatch'>Game not viewable</p> }
						{ game.options.isPrivate ? <p class='cantJoin'>Private Game</p> : (
							game.players[0] && game.players[1] ? <p class='gameFull'>Game Full</p> : 
							<button class='joinButton' index={index} type='button' onClick={(e) => this.handleJoin(e)} >Join Game</button> 
						)}
					</div>
				) : <p>No games to show</p>}
			</div>
		)
	}
}

export default GamesList;