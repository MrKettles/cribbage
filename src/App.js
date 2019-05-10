import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Game from './components/Game';
import io from 'socket.io-client';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: '',
      allUsers: [],
      activeGame: '',
      gameOptions: {},
      games: [],
      messages: [],
      gameMessages: []
    }

    this.socket = io.connect('http://localhost:8000/');
  }

  componentDidMount(){
    this.socket.on('updateActiveUsers', users => {
      this.setState({allUsers: users || []});
    });

    this.socket.on('loadGames', games => {
      console.log(games);
      this.setState({games: games || []});
    });

    this.socket.on('loadChat', messages => {
      this.setState({messages: messages || []});
    });

    this.socket.on('postMessage', msgInfo => {
      let newMsgList = this.state.messages;
      newMsgList.push({
        user: msgInfo.user, 
        msg: msgInfo.msg
      });
      this.setState({messages: newMsgList});
    })

    this.socket.on('postPrivateMessage', msgInfo => {
      let newGameMsgs = this.state.gameMessages;
      newGameMsgs.push({
        user: (msgInfo.user === this.props.user) ? 'You' : msgInfo.user, 
        msg: msgInfo.msg
      });
      this.setState({gameMessages: newGameMsgs});
      console.log(msgInfo);
    })

    this.socket.on('startGame', gameInfo => {
      this.setState({activeGame: gameInfo.gameId, gameOptions: gameInfo.options});
    });

    this.socket.on('addToGame', (gameInfo, games) => {
      this.setState({activeGame: gameInfo.gameId, gameOptions: gameInfo.options, games: games});
    })
  }

  loginComplete(username){
    this.setState({user: username});
  }

  clearActiveGame(){
    this.setState({activeGame: '', gameMessages: []});
  }

  updateChat(message, gameId){
    let newMsg = {
      user: 'You',
      msg: message
    }
    if(gameId){
      let newMsgList = this.state.gameMessages;
      newMsgList.push(newMsg);
      this.setState({gameMessages: newMsgList});
      this.socket.emit('sendPrivateMessage', message, this.state.user, gameId);
    } else {
      let newMsgList = this.state.messages;
      newMsgList.push(newMsg);
      this.setState({messages: newMsgList});
      this.socket.emit('sendMessage', message, this.state.user);
    }
  }

  render() {
    return (
      <div className="App">
        <Route path='/' exact 
          render={props => 
            <Login 
              loginComplete={(name) => this.loginComplete(name) } 
              socket={this.socket}
              {...props} /> } />
        <Route path='/home' 
          render={props => 
            <Home 
              user={this.state.user} 
              allUsers={this.state.allUsers} 
              games={this.state.games} 
              messages={this.state.messages} 
              updateChat={(message, gameId) => this.updateChat(message, gameId)}
              socket={this.socket}
              {...props} /> } />
        <Route path='/game' 
          render={props => 
            <Game 
              user={this.state.user} 
              activeGame={this.state.activeGame} 
              gameMessages={this.state.gameMessages} 
              messages={this.state.messages}
              clearActiveGame={() => this.clearActiveGame()}
              updateChat={(message, gameId) => this.updateChat(message, gameId)}
              socket={this.socket}
              {...props} /> } />
      </div>
    );
  }
}

export default App;
