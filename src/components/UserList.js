import React, { Component } from 'react';

class UserList extends Component {
	constructor(props){
		super(props);

		this.state = {
			currUser: '',
			allUsers: []
		}
	}

	render(){
		return (
			<div id='userList'>
				<h2>Active Users</h2>
				<ul id='userul'>{
					this.props.allUsers.map((user, index) => 
						<li key={index}>{user}</li>
					)
				}</ul>
			</div>
		)
	}
}

export default UserList;