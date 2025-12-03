/* Ancient code published for archival purposes. May or may not work or be relevant.
Feel free to do whatever you want with this, if anything.
Archive from 2017-10-07 - contents may be older. */

clientWebsite = 'multiplayerpiano.com';
clientWebsitePort = '8080';
clientWebsocket = 'ws://' + clientWebsite + ':' + clientWebsitePort;
cstartroom = 'lolwutsecretlobbybackdoor';

MPP.chat.send('Starting Crystal... (Connection Information: Website: ' + clientWebsite + ' | Port: ' + clientWebsitePort + ' |: ' + clientWebsocket + ')');

crystal = new Client(clientWebsocket);
crystal.setChannel(cstartroom);
crystal.start();

const csend = function (message) {
	crystal.sendArray([{m:"a", message: message}]);
}

setTimeout(function() {
csend('Greetings everyone, I am Crystal. I\'m a chat bot created with javascript. You can type ' + c_prefix + 'help to view my command list.');
}, 3000);

//Variable Defines.
let commandsEnabled = true;
let c_prefix = '^';
let banned = [];
let Cchat_buffer = [];
let botname = 'Crystal';
let History = [];
let banMSG = true;
//Variable Defines.

//Interval Defines.
chatInt = setInterval(function() { var msg = Cchat_buffer.shift(); if (msg) crystal.sendArray([{m: "a", message: 'System: ' + msg }]); }, 1900);
autoUpdateName = setInterval(function() {updateName('~' + botname + ' (' + c_prefix + 'Help)~')}, 5000);
//Interval Defines.

//Function Defines.
function CsendChat(msg) {
	msg.match(/.{0,511}/g).forEach(function(x, i) {
		if(x == "") return; 
		if (i !== 0) x = "..." + x; Cchat_buffer.push(x);
	});
}

function updateName (name) {
	crystal.sendArray([{
		m: "userset", 
		set: {
			name: name
		}
	}]);
}

csend = CsendChat;

function reverse(s) {
  var o = '';
  for (var i = s.length - 1; i >= 0; i--)
    o += s[i];
  return o;
}
//Function Defines.

// crystal.on('a', function(msg) { var msgArr = msg.a.split(' '); if (msgArr[0] == c_prefix+'js' && msg.p._id == MPP.client.getOwnParticipant()._id) { try { csend('> '+JSON.stringify(eval(msg.a.substr(msgArr[0].length).trim()))); } catch (error) { E.chat.send('> (Error detected in code!)'+error); } } }); }, 1000);

crystal.on("a", function(msg) {

	data = msg;

	if (msg.a.toLowerCase().substring(0,1) == c_prefix) {

		if (banned.includes(msg.p._id)) {

			if (banMSG) {
				csend('I cannot serve you at this time.');
				banMSG = false;
			}

		} else {

			if (commandsEnabled) {

				banMSG = true;
				command1 = data.a.toLowerCase().split(c_prefix)[1];

				command2 = command1.split(' ')[0];

				input = command1.split(command2)[1].trim();

				if (command2 == 'help') {csend('Commands [1]: ' + c_prefix + 'help, ' + c_prefix + 'search, ' + c_prefix + 'myinfo, ' + c_prefix + 'reverse.')}
				if (command2 == 'search') { if(input=='') { csend('You are using this command incorrectly. Usage: ' + c_prefix + 'search <Whatever you want to search for>') } else { gcseCallback(input);  } }
				if (command2 == 'myinfo') {if(input=='') {csend('[|MYINFO|]: You are ' + data.p.name + '. | Your _id is: ' + data.p._id + '. | Your id is: ' + data.p.id + '. | Your color, in hex, is: ' + data.p.color + '. | Your name is: ' + msg.p.name.length + ' characters long.'); } else {csend('[|MYINFO|]: They are ' + info(input).name + '.')}} 
				if (command2 == 'reverse') { if(input=='') {csend('You are using this command incorrectly. Usage: ' + c_prefix + 'reverse text here');} else {csend('[|REVERSE|]: ' + reverse(input));}} 
			
			} else {

				csend('I\'m sorry, ' + data.p.name + ', I can\'t do that right now.');

			}
		}

	}

});
