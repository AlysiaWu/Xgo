// require express so that we can build an express app
var express = require('express');
// require path so that we can use path stuff like path.join
var path = require('path');
// instantiate the app
var app = express();
// set up a static file server that points to the "client" directory
app.use(express.static(path.join(__dirname, './client')));
// bodyParser
var bodyParser = require('body-parser');

app.use(bodyParser.json());


require('./config/mongoose.js');
require('./config/routes.js')(app);

var server = app.listen(5678, function() {
  console.log('cool stuff on: 5678');
});
var io = require("socket.io").listen(server);
// console.log(io);
io.sockets.on("connection", function(socket){
	socket.on("client_send_message", function(msg){ // where is data comes from
		// console.log(msg);
		io.emit('server_send_message', msg);
	});
	// socket.on("new_messages", function(data){
	// 	console.log(data.messages);
	// 	io.emit('message', data);

	// });	
});

