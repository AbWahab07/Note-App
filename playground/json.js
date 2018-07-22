/*
const obj = {
  name: 'Abdul',
  age: 20
};

const objToString = JSON.stringify(obj); // { "name": "Abdul", "age": 20}
console.log(typeof objToString); // string
console.log(objToString.name); // undefined


const string = '{ "name": "Abdul", "age": 20}';
const stringToObj = JSON.parse(string);
console.log(typeof stringToObj); // object
console.log(stringToObj.name); // Abdul
*/

const fs = require('fs');

const originalNote = {
  title: 'Bug Fix',
  body: 'Fix the bug as soon as possible'
};

const originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

let noteString;
noteString = fs.readFileSync('notes.json');
const note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);
