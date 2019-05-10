import React, { Component } from 'react';

class PlayerInfo extends Component {
	toLogin(){
		document.getElementById('login').style.display = 'block';
	}

	render(){
		return (
			<div id='playerInfo'>
				<h2>Player Info</h2>
				<div id='playerId'>
					<div id='playerPhoto'>
					</div>
					<h3>{
						this.props.user ? this.props.user : 
						<button type='button' onClick={this.toLogin}>Add Nickname</button>}</h3>
				</div>
				<div id='playerStats'>
					<h4>Player Stats</h4>
					<p>Games Played: </p>
					<p>Games Won: </p>
					<p>Games Lost: </p>
					<p>Win/Total: </p>
				</div>
			</div>
		)
	}
}

export default PlayerInfo;