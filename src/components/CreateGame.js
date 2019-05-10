import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

class CreateGame extends Component {
	constructor(props){
		super(props);

		this.state={
			isViewable: false,
			isPrivate: false,
			startGame: false
		}

	}

	checkboxClickHandler(e){
		// Relies on state value being named "is" + capitalized version of input value
		let ref = 'is' + e.target.value.slice(0,1).toUpperCase() + e.target.value.slice(1);
		this.setState({[ref]: e.target.checked});
	}

	clickHandler(e){
		e.preventDefault();
		let options = {
			isViewable: this.state.isViewable,
			isPrivate: this.state.isPrivate
		}
		let player=this.props.user;
		this.props.socket.emit('createGame', player, options);
		this.setState({startGame: true});
	}

	render(){
		if(this.state.startGame){
			return <Redirect to='/game' />
		}
		return(
			<div id='createGame'>
				<h2>New Game</h2>
				<form>
					<input onChange={(e) => this.checkboxClickHandler(e)} type='checkbox' name='viewable' value='viewable' id='viewable' />
					<label htmlFor='viewable'>Allow Spectators</label>
					<input onChange={(e) => this.checkboxClickHandler(e)} type='checkbox' value='private' name='private' id='private' />
					<label htmlFor='private'>Private Game</label>
					<button
						type='submit'
						onClick={(e) => this.clickHandler(e)}
						>Create Game
					</button>
				</form>
			</div>
		)
	}
}

export default CreateGame;