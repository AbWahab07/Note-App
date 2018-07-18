const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const fs = require('fs');
const os = require('os');
const _ = require('lodash');


const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));


// Using moudle.exports from notes.js
var notes = require('./notes');
debug(notes.name); // abdul
var add = notes.add(2, 3);
debug(`Adding two numbers. Result is ${add}`); // 5


// Using Lodash utilities
debug(_.isString('Abdul')); // true
debug(_.isString(true)); // false
var uniqArry = _.uniq(['Abdul', 'Abdul', 1, 2, 2, 1]); // ['Abdul', 1, 2]
debug(uniqArry);


// Using os built-in Module
var user = os.userInfo();
debug(user.username); // ok


// Using fs buit-in Module
fs.appendFile('greetings.txt', `Hello ${user.username}`, (err) => {
	if (err)
		debug(err);
	else
		debug('Data was sucessfully appended to the file');
});


app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(port, () => {
	debug(`Server is running at ${chalk.green(port)}`);
});