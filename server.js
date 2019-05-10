const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketLogic = require('./ioConfig');

const PORT = process.env.PORT || 8000;

// let sockets = [];
// let users = [];
// let games = [];
// let messages = [];

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
	console.log('Initial ID: ' + socket.id);
	socketLogic(io, socket);
// 	socket.on('login', (nickname) => {
// 		sockets.push(socket.id);
// 		let user = nickname;
// 		users.push(user);
// 		users[sockets.indexOf(socket.id)] = user;
// 		io.emit('updateActiveUsers', users);
// 		socket.emit('loadGames', games);
// 		socket.emit('loadChat', messages);
// 		console.log('login');
// 	});

// 	socket.on('disconnect', reason => {
// 		//Not sure what's going on here. The if statement is stopping repeat calls,
// 		//which I *assume* is the socket trying to reconnect. But not sure.
// 		if(sockets.indexOf(socket.id) >= 0){
// 			let user = users[sockets.indexOf(socket.id)];
// 			let userGame = games.find(game => game.players.includes(user));
// 			games.splice(games.indexOf(userGame),1);
// 			users.splice(users.indexOf(user),1);
// 			// console.log(reason);
// 			io.emit('updateActiveUsers', users);
// 			io.emit('loadGames', games);
// 			console.log('disconnect');
// 			sockets.splice(sockets.indexOf(socket.id), 1);
// 		}
// 	});

// 	socket.on('sendMessage', (message, user) => {
// 		let msgInfo = {
// 			msg: message,
// 			user: user,
// 			gameId: false
// 		}
// 		messages.push(msgInfo);
// 		socket.broadcast.emit('postMessage', msgInfo);
// 	});

// 	socket.on('sendPrivateMessage', (message, user, gameId) => {
// 		let msgInfo = {
// 			msg: message,
// 			user: user,
// 			gameId: gameId
// 		};
// 		socket.to(gameId).emit('postPrivateMessage', msgInfo);
// 		console.log('send private message');
// 	});

// 	socket.on('createGame', (player, options) => {
// 		//The gameId assignment seems veeeery sketchy
// 		let gameId = String((Math.random() * 10e12).toString().slice(0,8) + (Math.random() * 10e12).toString().slice(0,8)); 
// 		console.log('GameId: ' + gameId);
// 		let gameInfo = {
// 			gameId: gameId,
// 			players: [player],
// 			options: options
// 		}
// 		games.push(gameInfo);
// 		socket.join(gameId);
// 		let startMsg = {
// 			msg: 'You have started a game. Waiting for another player...',
// 			user: 'Bot',
// 			gameId: gameId
// 		}
// 		io.emit('startGame', gameInfo);
// 		io.local.emit('postPrivateMessage', startMsg);
// 		socket.broadcast.emit('loadGames', games);
// 		console.log('creategame');
// 	});


// 	socket.on('joinGame', (gameId, user) => {
// 		let game = games[games.indexOf(games.find(game => game.gameId === gameId))];
// 		if(game.players.length < 2){	
// 			game.players.push(user);
// 			socket.join(gameId);
// 			let joinMsg = {
// 				msg: `${user} has joined the game.`,
// 				user: 'Bot',
// 				gameId: gameId
// 			}
// 			socket.to(gameId).emit('postPrivateMessage', joinMsg);
// 			let userJoin = joinMsg;
// 			userJoin.msg = `You have joined a game with ${game.players[0]}`;
// 			io.local.emit('postPrivateMessage', userJoin);
// 			socket.emit('addToGame', game, games);
// 			console.log('joingame');
// 		} else {

// 		}
// 	});

// 	socket.on('exitGame', (activeGame, user) => {
// // This is very rudimentary. Need to think about handling drop-outs
// 		socket.leave(activeGame);
// 		let game = games.find(game => game.gameId === activeGame);
// 		games.splice(games.indexOf(game), 1);
// 		io.emit('loadGames', games);
// 		io.local.emit('loadChat', messages);
// 		console.log('exitgame');
// 	});

	// ioRun(socket);
	// socket.on('loadGames', () => {
	// 	io.emit('loadGames', games);
	// })
})

http.listen(PORT, () => {
	console.log('listening on ' + PORT);
});