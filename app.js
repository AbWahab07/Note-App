const chalk = require('chalk');
const _ = require('lodash');
const yargs = require('yargs');


const notes = require('./notes');

let added;
let removed;
let noteRead;
let message;
let notesList;
const title = {
  describe: 'Title of the note',
  demand: true,
  alias: 't'
};

const body = {
  describe: 'Body of the note',
  demand: true,
  alias: 'b'
};
// app.use(morgan('tiny'));


/*
console.log(process.argv); // Lists arguments of the CLI
const command = process.argv[2]; // Default Argv array
console.log(command);
*/

// Yargs uses the same default process.argv array but it parses the arguments in a better way
// We're using yargs.argv instead of process.argv
const { argv } = yargs
  .command('add', 'Add a new note', {
    title,
    body,
  })
  .command('remove', 'Remove a Note', {
    title
  })
  .command('list', 'List all the notes')
  .command('read', 'Read a note', {
    title
  })
  .help();
const command = argv._[0];
// console.log(argv);
switch (command) {
  // node app.js add --title= --body=
  case 'add':
    added = notes.addNote(argv.title, argv.body);
    message = added ? `Note "${chalk.green(argv.title)}" has been added.` : `Note with title "${chalk.red(argv.title)}" already exists`;
    console.log(message);
    break;
  case 'remove':
    // node app.js remove --title=
    removed = notes.removeNote(argv.title);
    message = removed ? `Note with title "${chalk.green(argv.title)}" has been deleted` : `Note with title "${chalk.red(argv.title)}" doesn't exists`;
    console.log(message);
    break;
  case 'list':
    // node app.js list
    notesList = notes.listNotes();
    if (notesList.length > 0) {
      notesList.forEach(note => notes.logNote(note));
    }
    break;
  case 'read':
    // node app.js read --title=
    noteRead = notes.readNote(argv.title);
    message = noteRead ? `Note title: ${chalk.green(noteRead.title)} \nNote body: ${chalk.green(noteRead.body)}` : `Note with title ${chalk.red(argv.title)} doesn't found`;
    console.log(message);
    break;
  default:
    console.log(chalk.red('Command Not Recognized'));
}
