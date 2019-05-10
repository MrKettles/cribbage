import React, {Component} from 'react';

class GameAction extends Component {
	constructor(props){
		super(props);

		this.state = {
			boxColor: 'gray'
		}

	}

	componentDidMount(){
		this.props.socket.on('updateColor', color => {
			this.setState({boxColor: color});
			console.log('New Color: ' + color);
		})
	}

	clickHandler(e){
		e.preventDefault();
		this.setState({boxColor: e.target.value});
		this.props.socket.emit('updateBoxColor', e.target.value, this.props.activeGame);
	}

	render(){
		return (
			<div id='GameAction'>
				<h1>Testing sockets with colored boxes...</h1>
				<div id='colorBox' style={{width: '300px', height: '300px', background: this.state.boxColor}}></div>
				<button type='button' value='blue' onClick={(e) => this.clickHandler(e)}>Blue</button>
				<button type='button' value='red' onClick={(e) => this.clickHandler(e)}>Red</button>
				<button type='button' value='yellow' onClick={(e) => this.clickHandler(e)}>Yellow</button>
				<button type='button' value='gray' onClick={(e) => this.clickHandler(e)}>Reset</button>
			</div>
		)
	}
}

export default GameAction;