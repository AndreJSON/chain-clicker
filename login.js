'use strict';

var creds = {
	username: 'swaggestUser',
	password: 'swaggestPW'
};

setTimeout(function () {
	document.getElementById('username').value = creds.username;
	document.getElementById('password').value = creds.password;
	document.getElementById('play-now-form').submit();
}, 5000);