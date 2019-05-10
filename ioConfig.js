let allSockets = [];
let users = [];
let games = [];
let messages = [];

module.exports = (io, socket) => {
	socket.on('login', (nickname) => {
		allSockets.push(socket.id);
		let user = nickname;
		users.push(user);
		users[allSockets.indexOf(socket.id)] = user;
		io.emit('updateActiveUsers', users);
		socket.emit('loadGames', games);
		socket.emit('loadChat', messages);
		console.log('login');
	});

	socket.on('disconnect', reason => {
		//Not sure what's going on here. The if statement is stopping repeat calls,
		//which I *assume* is the socket trying to reconnect. But not sure.
		if(allSockets.indexOf(socket.id) >= 0){
			let user = users[allSockets.indexOf(socket.id)];
			let userGame = games.find(game => game.players.includes(user));
			let message = {
				msg: `${user} has left the game.`,
				user: 'Bot',
				gameId: false
			}
			if(userGame){ socket.to('Rm-' + userGame.gameId).emit('postPrivateMessage', message); }
			games.splice(games.indexOf(userGame),1);
			users.splice(users.indexOf(user),1);
			// console.log(reason);
			io.emit('updateActiveUsers', users);
			io.emit('loadGames', games);
			console.log('disconnect');
			allSockets.splice(allSockets.indexOf(socket.id), 1);
		}
	});

	socket.on('sendMessage', (message, user) => {
		let msgInfo = {
			msg: message,
			user: user,
			gameId: false
		}
		messages.push(msgInfo);
		socket.broadcast.emit('postMessage', msgInfo);
	});

	socket.on('sendPrivateMessage', (message, user, gameId) => {
		let msgInfo = {
			msg: message,
			user: user,
			gameId: gameId
		};
		socket.to('Rm-' + gameId).emit('postPrivateMessage', msgInfo);
		console.log('send private message');
	});

	socket.on('createGame', (player, options) => {
		//The gameId assignment seems veeeery sketchy
		let gameId = String((Math.random() * 10e12).toString().slice(0,8) + (Math.random() * 10e12).toString().slice(0,8)); 
		console.log('GameId: ' + gameId);
		let gameInfo = {
			gameId: gameId,
			players: [player],
			options: options
		}
		games.push(gameInfo);
		socket.join('Rm-' + gameId);
		let startMsg = {
			msg: 'You have started a game. Waiting for another player...',
			user: 'Bot',
			gameId: gameId
		}
		io.emit('startGame', gameInfo);
		socket.emit('postPrivateMessage', startMsg);
		socket.broadcast.emit('loadGames', games);
		console.log('creategame');
	});


	socket.on('joinGame', (gameId, user) => {
		let game = games.find(game => game.gameId === gameId);
		if(game.players.length < 2){	
			game.players.push(user);
			socket.join('Rm-' + gameId);
			let joinMsg = {
				msg: `${user} has joined the game.`,
				user: 'Bot',
				gameId: gameId
			}
			io.to('Rm-' + gameId).emit('postPrivateMessage', joinMsg);
			let userJoin = joinMsg;
			userJoin.msg = `You have joined a game with ${game.players[0]}`;
			socket.emit('postPrivateMessage', userJoin);
			socket.emit('addToGame', game, games);
			socket.broadcast.emit('loadGames', games);
			console.log('joingame');
		} else {

		}
	});

	socket.on('exitGame', (activeGame, user) => {
// This is very rudimentary. Need to think about handling drop-outs
		socket.leave('Rm-' + activeGame);
		let game = games.find(game => game.gameId === activeGame);
		games.splice(games.indexOf(game), 1);
		io.emit('loadGames', games);
		socket.emit('loadChat', messages);
		console.log('exitgame');
	});



	socket.on('updateBoxColor', (color, gameId) => {
		// io.sockets.in('Rm-' + gameId).emit('updateColor', color);
		socket.to('Rm-' + gameId).emit('updateColor', color);
		console.log('updating box color? Room: ' + gameId);
	})
}
